Feature: RMS API Test

  Scenario: User hits API endpoint 
    Given user makes a GET request to /api/RMSTest/media
    When request is successful with a status 200
    Then response time should be less than 1000 ms
    And id field is never null or empty
    And only one track in the list has now_playing as true
    And header should contain current date
