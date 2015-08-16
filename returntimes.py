import httplib2
from apiclient import discovery
import quickstart as M

def main():
    """
    Shows basic usage of the Gmail API.
    Creates a Gmail API service object and outputs a list of label names
    of the user's Gmail account.
    """
    credentials = M.get_credentials()
    http = credentials.authorize(httplib2.Http())
    service = discovery.build('gmail', 'v1', http=http)

    results = service.users().labels().list(userId='me').execute()
    messageIds = M.ListMessagesMatchingQuery(service, 'me', query='subject:Flight Confirmation')

    datalist = []
    outputTxt = open("out.txt", "w")
    for message in messageIds:
        datalist.append(M.GetMimeMessage(service, 'me', message[u'id']))

if __name__ == '__main__':
    main()


