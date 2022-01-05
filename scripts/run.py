import json
import norwegianblue
import requests
import typer

from datetime import date, datetime
from dateutil.parser import parse


cli = typer.Typer()


@cli.command()
def main():
    release_date = {
        "4.1": date(2022, 8, 1),
        "4.2": date(2023, 4, 1),
        "5.0": date(2023, 12, 1),
    }

    pypi = requests.get("https://pypi.org/pypi/Django/json").json()
    keys = [key for key in pypi["releases"].keys() if len(key.split(".")) == 2]
    for key in keys:
        if len(pypi["releases"][key]):
            release_date[key] = parse(pypi["releases"][key][0]["upload_time"]).date()

    releases = {}
    data = json.loads(norwegianblue.norwegianblue(product="django", format="json"))
    for release in data:
        cycle = release["cycle"]
        task_name = f"Django {cycle}"
        if "lts" in release:
            task_name = f"{task_name} LTS"

        if cycle in release_date:
            start = release_date[cycle]
        else:
            start = datetime.now().date()

        support = datetime.strptime(release["support"], "%Y-%m-%d")
        end = datetime.strptime(release["eol"], "%Y-%m-%d")

        if end < datetime.now():
            resource = "dead"
        elif support > datetime.now():
            resource = "bugfix"
        elif start > datetime.now().date():
            resource = "prerelease"
        else:
            resource = "security"

        releases[cycle] = {
            "cycle": cycle,
            "end": end,
            "resource": resource,
            "start": start,
            "support": support,
            "task_name": task_name,
        }

    if "4.1" not in releases:
        releases["4.1"] = {
            "cycle": "4.1",
            "task_name": "Django 4.1",
            "resource": "prerelease",
            "start": release_date["4.1"],
            "end": date(2023, 12, 1),
        }

    if "4.2" not in releases:
        releases["4.2"] = {
            "cycle": "4.2",
            "task_name": "Django 4.2 LTS",
            "resource": "prerelease",
            "start": release_date["4.2"],
            "end": date(2026, 4, 1),
        }

    if "5.0" not in releases:
        releases["5.0"] = {
            "cycle": "5.0",
            "task_name": "Django 5.0",
            "resource": "prerelease",
            "start": release_date["5.0"],
            "end": date(2025, 4, 1),
        }

    for release in releases:
        release = releases[release]
        typer.echo(
            "{\n"
            f"  taskID: \"{release['cycle']}\",\n"
            f"  taskName: \"{release['task_name']}\",\n"
            f"  resource: \"{release['resource']}\",\n"
            f"  start: date({release['start'].year:04d}, {release['start'].month:02d}, {release['start'].day:02d}),\n"
            f"  end: date({release['end'].year:04d}, {release['end'].month:02d}, {release['end'].day:02d})\n"
            "},",
        )


if __name__ == "__main__":
    main()
