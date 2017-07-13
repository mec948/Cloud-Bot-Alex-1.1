/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.ask.skill.5828a4e3-e1fb-477b-a9c3-6655cf2e1e71"; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
var FACTS = [
    "In 2006, Amazon launched two fairly simple services: computers you could rent by the hour, and computer storage you could rent by the hour. This became cloud computing.",
    "It’s not actually a Cloud. It is not the cloud we see in the Skies. It simply means that we are using the internet to store data on remote servers, rather than storing them locally on our hard disks.",
    "Many types of Cloud Computing Applications Exist. Depending on the need of your IT the type of cloud solution may vary. The 3 types of cloud solution are Public Cloud, Private Cloud and Hybrid Cloud.",
    "The Cloud is Safe. Cloud enables redundancy, simple data transfer and backups, so you’ll never lose your information while using this technology.",
    "50 percent of US Government agencies use the cloud at present.",
    "Cloud Computing is up to 40 times more cost-effective for an SMB compared to running its own IT system or department.",
    "More than 90 percent of all companies saw at least one area of improvement in their IT department since they moved to the cloud.",
    "Small to medium business that have adopted the cloud for increased mobility saw a 40 percent growth in revenues after a year compared to those that did not use the cloud.",
    "75% of businesses report that service availability improved since moving to the cloud.",
    "56% of organization are seeking to hire staff with cloud expertise.",
    "It’s predicted that 78% of U.S. small businesses will have fully adopted cloud computing by 2020.",
    "The US Federal Government saved $5.5 Billion per year by shifting to Cloud Services.",
    "Experts predict that 40 zettabytes of data will be held in the cloud by 2020.",
    "By 2018, at least 30% of service-centric companies will move the majority of their ERP applications to the cloud.",
    "For SMB, energy use and carbon emissions could be cut by 90% by using cloud computing, saving the environment and energy costs.",
    "A new cloud server is added for every 600 smartphones or 120 tablets in use.",
    "Banking produces the most activity within the cloud."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a cloud fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye User.";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye User.";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your cloud fact: " + randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};

