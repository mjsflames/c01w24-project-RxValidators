import pandas as pd
import pytest

from scrapers.verify import verify

pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', None)
pd.set_option('display.width', None)

df = pd.read_csv("tests/physician_data.csv")
passed_count, failed_count = 0, 0
failures = []

@pytest.fixture(scope="session", autouse=True)
def print_message_after_tests(request):
    yield
    print("")
    print("")
    global passed_count, failed_count, failures
    print(f"Passed - {passed_count}, Failed - {failed_count}")
    for failure in failures:
        print(failure)

@pytest.mark.parametrize("i", range(len(df)))
def test_assertions(i, capfd):
    global df, passed_count, failed_count, failures
    row = df.iloc[i]
    status = verify(row['Last Name'], row['First Name'], \
                    row['Licence #'], row['Province'])
    if status == row['Status']:
        passed_count += 1
        assert True
    else:
        failed_count += 1
        failures.append((row['Last Name'], row['First Name'], \
                         row['Licence #'], row['Province']))
        assert False
