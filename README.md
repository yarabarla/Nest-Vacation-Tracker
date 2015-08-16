# Nest-Vacation-Tracker

So you just booked a vacation and are super stoked about relaxing for a couple of weeks on your trip.  You get to the airport and realize that you forgot to manually set your Nest thermostat to off.  Oh no!  Now your vacation is off to a bad start and you can't get the thought of wasting all that money out of your head.  

Nest currently has an Auto-Away feature that will keep your room 5-10 degrees within your desired room temperature.  However, this only fulfills the need when you are away for the short-term, eg. a couple of hours/ a day.  Currently, there doesn't exist a way to automatically turn on power saving mode for your Nest thermostat when you leave for the long term, eg. a week/ a month.  Manual intervention is needed...

Till now!  

We have created an algorithm that will be able to determine when you are leaving out of town by utilizing the Gmail API and extracting your flight information.  Once we determine the dates that you are gone for, we command our Nest thermostat to execute the best money-saving action depending on your region.  We have integrated a weather API that will determine the surrounding temperature and determine if turning off the HVAC system or setting the temperature to a minimum/maximum value is the most optimal solution to save costs.  For instance, in colder areas, we wouldn't want the HVAC system to completely turn off but instead maintain the lowest temperature so that the water pipes don't freeze.  We have also integrated a cost saving calculator to the main nest home UI that will show how much you have saved!  Finally, we integrated the Twilio API that will text you once our algorithm activates!  
