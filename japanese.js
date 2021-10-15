function Japanese(str) {
		switch (str) {
			case 1:{ //Tab Title of Webpage
				return "D4DJ Parking Calculator | Powered by Muni"
			}break;
			case 2:{ //Header Title (Top) of Webpage
				return "D4DJ Event Parking Calculator"
			}break;
			case 3:{ //Set up your options (Category Title)
				return "Parking Configuration"
			}break;
			case 4:{ //Selection for event type: Poker/Slots
				return "Poker/Slots"
			}break;
			case 5:{ //Selection for event type: Bingo
				return "Bingo"
			}break;
			case 6:{ //Selection for event type: Medley
				return "Medley"
			}break;
			case 24:{ //Selection for event type: Raid
				return "Raid"
			}break;
			case 7:{ //Label for team % selector (Include ":")
				return "Event Team Bonus:"
			}break;
			case 17:{ //Label for whether to enable flexible team options.
				return "Flexible Team?"
			}break;
			case 8:{ //Tooltip for flexible team options (mouseover)
				return "If turned on, calculates scoring options using lower % teams also."
			}break;
			case 18:{ //Label for what the max score in free lives is.
				return "Max Free Live Score:"
			}break;
			case 9:{ //Tooltip for what the max score in free lives is. (Setting it to 0 forces the calculator to use Rehearsal)
				return "The maximum score you can get from playing a song using <font color=\"aqua\">Free Live</font>.<br><sub>(Use 0 for Rehearsals Only)</sub>"
			}break;
			case 10:{ //Label for Advanced Settings toggle.
				return "Advanced Options?"
			}break;
			case 11:{ //Tooltip for Advanced Settings toggle.
				return "Enable voltage & EP limits."
			}break;
			case 12:{ //Label for setting the lowest EP where voltage is allowed.
				return "Use voltage until: "
			}break;
			case 13:{ //Label for setting the total amount of voltage the calculator may consume.
				return "Max Voltage to use:"
			}break;
			case 14:{ //Label for setting the Starting EP amount.
				return "Starting EP:"
			}break;
			case 15:{ //Label for setting the final EP amount.
				return "Target EP:"
			}break;
			case 16:{ //The text for the button users click to run the calculator.
				return "Calculate"
			}break;
			case 19:{ //Tip: Here's the Light on EX or Synchrogazer on Hard/EX difficulty are some of the highest scoring songs you can pick.
				return "Here's the Light on EX or Synchrogazer on Hard/EX difficulty are some of the highest scoring songs you can pick."
			}break;
			case 20:{ //Tip: When you get close to the score you need in Free Live, purposely fail the song. Notes are worth 10% their normal value when you have 0 health so you can finish easily.
				return "When you get close to the score you need in Free Live, purposely fail the song. Notes are worth 10% their normal value when you have 0 health so you can finish easily."
			}break;
			case 21:{ //Tip: The "Flexible Team" option gives you the fastest park, but at the expense of more voltage.
				return "The <b>\"Flexible Team\"</b> option gives you the fastest park, but at the expense of more voltage."
			}break;
			case 22:{ //Tip: The maximum score you can get from playing a song using "Free Live" (Use 0 for Rehearsals Only)
				return "The maximum score you can get from playing a song using <font color=\"aqua\">Free Live</font>.<br> <sub>(Use 0 for Rehearsals Only)</sub>"
			}break;
			case 23:{ //See any issues? Contact Mirby#5516 on D4DJ discord
				return "See any issues? Contact Mirby#5516 on D4DJ discord"
			}break;
			case "%INITIAL%":{ //This message is the first thing to display for a normal calculation.
				//Sample message:
				/*
				Calculating from 100000 to 104000 for event type Poker/Raid...
					(All games are done in Free Live)

				Found a park! 9 steps and 13 voltage required!
				*/
				//Variables for this message:
				/*
				Calculating from %START% to %TARGET% for event type %EVENT%...
					(All games are done in Free Live)

				Found a park! %STEPS% step%PLURAL_STEPS% and %VOLTAGE% voltage required!
				*/
				return "Calculating from %START% to %TARGET% for event type %EVENT%...\n\t(All games are done in Free Live)\n\nFound a park! %STEPS% step%PLURAL_STEPS% and %VOLTAGE% voltage required!"
			}break;
			case "%STEP%":{ //This message is displayed for each normal voltage step in the process.
				//Sample message:
				/*
					Step 1) Using 5 voltage w/160% team, score between 640000~649999 pts. EP +1480. Remaining:2520 EP 
				*/
				//Variables for this message:
				/*
					Step %STEP%) Using %VOLTAGE% voltage w/%PERCENT%% team, score between %LOWSCORE%~%HIGHSCORE% pts. EP +%EPGAIN%. Remaining:%REMAINING% EP 
				*/
				return "Step %STEP%) Using %VOLTAGE% voltage w/%PERCENT%% team, score between %LOWSCORE%~%HIGHSCORE% pts. EP +%EPGAIN%. Remaining:%REMAINING% EP"
			}break;
			case "%REHEARSAL%":{ //Similar to above, but for a rehearsal step instead.
				return "Step %STEP%) Use Rehearsal w/%PERCENT%% team. EP +%EPGAIN%. Remaining:%REMAINING% EP"
			}break;
			case "%LARGEGAP%":{ //This message is displayed if the Starting EP and Final EP gap is too big for reasonable calculations.
				return "Get closer to target score before using parking calculator!";
			}break;
			case "%FAILED%":{ //This message is displayed if it's impossible to park.
				return "Impossible to park using this team!"
			}break;
			default:{ //Default to English when translation doesn't exist.
				return English(str)
			}
		}
	}