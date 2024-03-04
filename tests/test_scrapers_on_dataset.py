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









        # df = pd.read_csv("tests/physician_data.csv")
        # passed_count, failed_count = 0, 0

        # self.assertEqual(1, 1)

        # for index, row in df.iterrows():
        #     try:
        #         status = verify(row['Last Name'], row['First Name'], \
        #                         row['Licence #'], row['Province'])
        #         passed_count += 1 if status == row['Status'] else 0
        #         failed_count += 1 if status != row['Status'] else 0
        #         self.assertEqual(status, row['Status'])
        #     except Exception as e:
        #         failed_count += 1
        #         self.assertEqual(0, 0)


        # pbar = tqdm(total=len(df), desc="Scraping in Progress", position=0)
        # for index, row in df.iterrows():
        #     try:
        #         status = verify(row['Last Name'], row['First Name'], \
        #                         row['Licence #'], row['Province'])
        #         passed_count += 1 if status == row['Status'] else 0
        #         failed_count += 1 if status != row['Status'] else 0
        #         self.assertEqual(status, row['Status'])
        #     except AssertionError as e:
        #         failed_count += 1
        #         print(f"AssertionError: {e}")
        #     except Exception as e:
        #         failed_count += 1
        #         print(f"Exception occurred: {e}")
        #     finally:
        #         pbar.set_description(f"Scraping in Progress: Passed - {passed_count}, Failed - {failed_count}")
        #         pbar.update(1)

