import requests
import typer

from datetime import date, datetime
from dateutil.parser import parse


cli = typer.Typer()


@cli.command()
def main():
    future_release_dates = {
        "4.1": date(2022, 8, 1),
        "4.2": date(2023, 4, 1),
        "5.0": date(2023, 12, 1),
        "5.1": date(2024, 8, 1),
        "5.2": date(2025, 5, 1),
    }

    # pull release dates from pypi
    url = "https://pypi.org/pypi/Django/json"
    pypi = requests.get(url).json()
    keys = [key for key in pypi["releases"].keys() if len(key.split(".")) == 2]
    for key in keys:
        if len(pypi["releases"][key]):
            future_release_dates[key] = parse(pypi["releases"][key][0]["upload_time"]).date()

    # pull eol and eos dates from endoflife.date
    url = "https://endoflife.date/api/django.json"
    data = requests.get(url).json()
    releases = {}
    for release in data:
        cycle = release["cycle"]
        task_name = f"Django {cycle}"
        if "lts" in release:
            task_name = f"{task_name} LTS"

        if cycle in future_release_dates:
            start = future_release_dates[cycle]
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
            "start": future_release_dates["4.1"],
            "end": date(2023, 12, 1),
        }

    if "4.2" not in releases:
        releases["4.2"] = {
            "cycle": "4.2",
            "task_name": "Django 4.2 LTS",
            "resource": "prerelease",
            "start": future_release_dates["4.2"],
            "end": date(2026, 4, 1),
        }

    if "5.0" not in releases:
        releases["5.0"] = {
            "cycle": "5.0",
            "task_name": "Django 5.0",
            "resource": "prerelease",
            "start": future_release_dates["5.0"],
            "end": date(2025, 4, 1),
        }

    if "5.1" not in releases:
        releases["5.1"] = {
            "cycle": "5.1",
            "task_name": "Django 5.1",
            "resource": "prerelease",
            "start": future_release_dates["5.1"],
            "end": date(2025, 12, 1),
        }

    if "5.2" not in releases:
        releases["5.2"] = {
            "cycle": "5.2",
            "task_name": "Django 5.2 LTS",
            "resource": "prerelease",
            "start": future_release_dates["5.2"],
            "end": date(2028, 4, 1),
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
