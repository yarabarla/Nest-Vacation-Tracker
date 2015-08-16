import httplib2
from apiclient import discovery
import quickstart as M
import datetime
import time
import json
flightDict = {}
flightDict['flights'] = []
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
    #f = open('out.txt', 'wb')
    for message in messageIds:
        datalist.append(M.GetMimeMessage(service, 'me', message[u'id']))
        processDateAndTime(datalist[-1])
        #f.write(M.GetMimeMessage(service, 'me', message[u'id']))
    #f.close()
    
def processDateAndTime(emailbody):
    if 'spiritairlines' in emailbody:
        processSpiritAirlines(emailbody)

def processSpiritAirlines(emailbody):
    eachLineArray = emailbody.splitlines()
    flightstops = []
    for line in eachLineArray:
        if '*TIME*' in line:
            indexOfNextLine = eachLineArray.index(line)+1
            flightstops.append(line + eachLineArray[indexOfNextLine])
            #print flightstops[-1]
    returnTime = []
    holidayLocation = flightstops[0].split('min')[1]
    holidayLocation = holidayLocation.split(':')[0]
    temp = holidayLocation.split(' ')
    holidayLocation = temp[1] + temp[2]
    departureDate = (flightstops[0].split('* *TIME*')[0]).split('DAY, ')[1]
    arrivalDate = (flightstops[1].split('* *TIME*')[0]).split('DAY, ')[1]
    departureTime = (flightstops[0].split(':')[0])[-2:] + ':' + (flightstops[0].split(':')[1])[:5]
    arrivalTime = (flightstops[1])[-8:]
    departureLocation = ((flightstops[0].split('*DURATION*'))[1].split(':')[0])[:-2]
    spiritDict = {}
    spiritDict['start_location'] = departureLocation
    spiritDict['end_location'] = holidayLocation
    departureYear = int(departureDate.split(' ')[-1])
    #conv=time.strptime(from_date,"%a %b %d %Y")
    departureTimeFinal = datetime.datetime.strptime( departureDate + departureTime, "%B %d, %Y %I:%M %p").strftime('%s')
    arrivalTimeFinal = datetime.datetime.strptime( arrivalDate +' '+ arrivalTime, "%B %d, %Y %I:%M %p").strftime('%s')
    spiritDict['start_time'] = departureTimeFinal
    spiritDict['end_time'] = arrivalTimeFinal
    flightDict['flights'].append(spiritDict)
    f = open('times.txt', 'a')
    f.write(json.dumps(flightDict, default=lambda o: o.__dict__))
    f.close()
    #print flightDict

if __name__ == '__main__':
    main()


