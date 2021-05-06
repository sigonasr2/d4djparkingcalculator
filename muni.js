const MAXSTEPS= 10000

	function Korean(str) {
		switch (str) {
			case "Hello":{
				return "안녕하세요"
			}break;
			default:{
				return English(str)
			}
		}
	}

	function English(str) {
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
			case 4:{ //Selection for event type: Poker/Raid
				return "Poker/Raid"
			}break;
			case 5:{ //Selection for event type: Bingo
				return "Bingo"
			}break;
			case 6:{ //Selection for event type: Medley
				return "Medley"
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
			default:{
				return "???"
			}
		}
	}

	function Reveal(str) {
		switch (str) {
			case "Hello":{
				return "Hi"
			}break;
			default:{
				return English(str)
			}
		}
	}
	
	function ConvertVariables(str,data) {
		return str
			.replaceAll("%START%",data.start)
			.replaceAll("%TARGET%",data.target)
			.replaceAll("%EVENT%",data.event)
			.replaceAll("%STEPS%",data.steps)
			.replaceAll("%PLURAL_STEPS%",Plural(data.steps))
			.replaceAll("%VOLTAGE%",data.voltage)
			.replaceAll("%STEP%",data.step)
			.replaceAll("%PERCENT%",data.percent)
			.replaceAll("%LOWSCORE%",data.lowscore)
			.replaceAll("%HIGHSCORE%",data.highscore)
			.replaceAll("%EPGAIN%",data.epgain)
			.replaceAll("%REMAINING%",data.remaining)
	}
	
	var LANGUAGE=Reveal
	var LANGUAGELIST={English:English,Korean:Korean}
	var TRANSLATEELEMENTS=100 //Increase as number of translated elements increases.

	function Plural(t) {
		return t==1?"":"s"
	}
	
	function ConvertLanguage() {
		for (var i=0;i<TRANSLATEELEMENTS;i++) {
			var e = document.getElementsByClassName("translate"+i)[0];
			if (e) {
				e.innerHTML=LANGUAGE(i)
			}
			//document.getElementById("console").value+=LANGUAGE(e.innerHTML)+"\n"
		}
	}
	ConvertLanguage()
	
	function toggle(){
		//document.getElementById("console").value+=JSON.stringify(document.getElementById("advanced"))
		document.getElementById("advanced2").style.visibility=document.getElementById("advanced").checked?"visible":"hidden"
	}

	function test(){
		
		var start = Math.abs(Math.max(0,Number(document.getElementById("starting").value)))
		var end = Math.abs(Math.max(0,Number(document.getElementById("ending").value)))
		var bonus = Number(document.getElementById("team").value)
		var type = (document.getElementById("Bingo").checked?"Bingo":
		document.getElementById("Poker").checked?"Poker/Raid":
		"Medley")
		var flexible = document.getElementById("flexible").checked
		//document.getElementById("console").value=flexible+"...\n\n"
		var step=1
		var flameCount=0
		var originalTarget=start
		document.getElementById("console").value=""

		var interval = (type=="Medley")?15000:10000
		
		var maxscore = Math.floor(Math.abs(Math.min(5000000,Math.max(0,Number(document.getElementById("maxscore").value))))/interval)*interval

		function EPCalc(voltage,score,bonus) {
			if (voltage>0) {
				switch (type) {
					case "Bingo":{
						return voltage * Math.floor((1 + bonus)*Math.max(10,Math.floor(score/interval)))
					}break;
					case "Medley":{
						return voltage * Math.floor((1 + bonus)*(10+Math.floor(score/interval)))
					}break;
					case "Poker/Raid":{
						return voltage * Math.floor((1 + bonus)*(50 + Math.floor(score/interval)))
					}break;
				}
			} else {
				return Math.round(bonus*10)+10
			}
		}

		function EvenOdd(val) {
			return val%2==0?"even":"odd"
		}

		function TryBiggestGain(tbonus) {
			var voltage=5
			for (var i=maxscore;i>=maxscore*0.8;i-=interval) {
				if (start+EPCalc(voltage,i,tbonus)<end-10||((start+EPCalc(voltage,i,tbonus)==end)&&((end-start)%2==1||(end-start)>26))) {
					//document.getElementById("console").value+="Ending value needs to be "+EvenOdd(end-10)+"\n"
					if (EvenOdd(start+EPCalc(voltage,i,tbonus))==EvenOdd(end-10)) {
						//document.getElementById("console").value+=EvenOdd(start+EPCalc(voltage,i,tbonus))+"/"+EvenOdd(end-10)+"\n"
						start+=EPCalc(voltage,i,tbonus)
						flameCount+=voltage
						document.getElementById("console").value+=ConvertVariables(LANGUAGE("%STEP%"),{step:step++,voltage:voltage,percent:Math.round(tbonus*100),lowscore:i,highscore:(i+interval-1),epgain:EPCalc(voltage,i,tbonus),remaining:end-start})+"\n"
						/*"Step "+(step++)+") Using "+voltage+" voltage w/"+Math.round(tbonus*100)+"% team, score between "+i+"~"+(i+interval-1)+" pts. EP +"+EPCalc(voltage,i,tbonus)+". Remaining:"+(end-start)+" EP \n"*/
						return true
					}
				}
			}
			return false
		}

		function TrySmallerGain(voltage,tbonus) {
			for (var i=maxscore;i>=maxscore*0.8;i-=interval) {
				if (start+EPCalc(voltage,i,tbonus)<end-10||((start+EPCalc(voltage,i,tbonus)==end)&&((end-start)%2==1||(end-start)>26))) {
					//document.getElementById("console").value+="Ending value needs to be "+EvenOdd(end-10)+"\n"
					if (EvenOdd(start+EPCalc(voltage,i,tbonus))==EvenOdd(end-10)||start+EPCalc(voltage,i,tbonus)==end) {
						//document.getElementById("console").value+=EvenOdd(start+EPCalc(voltage,i,tbonus))+"/"+EvenOdd(end-10)+"\n"
						start+=EPCalc(voltage,i,tbonus)
						flameCount+=voltage
						document.getElementById("console").value+=ConvertVariables(LANGUAGE("%STEP%"),{step:step++,voltage:voltage,percent:Math.round(tbonus*100),lowscore:i,highscore:(i+interval-1),epgain:EPCalc(voltage,i,tbonus),remaining:end-start})+"\n"
						/*"Step "+(step++)+") Using "+voltage+" voltage w/"+Math.round(tbonus*100)+"% team, score between "+i+"~"+(i+interval-1)+" pts. EP +"+EPCalc(voltage,i,tbonus)+". Remaining:"+(end-start)+" EP \n"*/
						return true
					}
				}
			}
			return false
		}

		function TrySmolGain(voltage,tbonus) {
			for (var i=maxscore;i>=0;i-=interval) {
				if ((EPCalc(voltage,i,tbonus)>=(10+Math.round(bonus*10))&&(start+EPCalc(voltage,i,tbonus)<=end-(10+Math.round(bonus*10))))||((start+EPCalc(voltage,i,tbonus)==end)&&((end-start)%2==1||(end-start)>26))) {
					//document.getElementById("console").value+="Ending value needs to be "+EvenOdd(end-10)+"\n"
					if (EvenOdd(start+EPCalc(voltage,i,tbonus))==EvenOdd(end-10)||start+EPCalc(voltage,i,tbonus)==end) {
						//document.getElementById("console").value+=EvenOdd(start+EPCalc(voltage,i,tbonus))+"/"+EvenOdd(end-10)+"\n"
						start+=EPCalc(voltage,i,tbonus)
						flameCount+=voltage
						document.getElementById("console").value+=ConvertVariables(LANGUAGE("%STEP%"),{step:step++,voltage:voltage,percent:Math.round(tbonus*100),lowscore:i,highscore:(i+interval-1),epgain:EPCalc(voltage,i,tbonus),remaining:end-start})+"\n"
						/*"Step "+(step++)+") Using "+voltage+" voltage w/"+Math.round(tbonus*100)+"% team, score between "+i+"~"+(i+interval-1)+" pts. EP +"+EPCalc(voltage,i,tbonus)+". Remaining:"+(end-start)+" EP \n"*/
						return true
					}
				}
			}
			for (var i=maxscore;i>=0;i-=interval) {
				if (EvenOdd(start+EPCalc(voltage,i,tbonus))!=EvenOdd(end-10)&&(((start+EPCalc(voltage,i,tbonus))==end)&&((end-start)%2==1||(end-start)>26))) {
					//document.getElementById("console").value+="Ending value needs to be "+EvenOdd(end-10)+"\n"
					//document.getElementById("console").value+=EvenOdd(start+EPCalc(voltage,i,tbonus))+"/"+EvenOdd(end-10)+"\n"
					start+=EPCalc(voltage,i,tbonus)
					flameCount+=voltage
					document.getElementById("console").value+=ConvertVariables(LANGUAGE("%STEP%"),{step:step++,voltage:voltage,percent:Math.round(tbonus*100),lowscore:i,highscore:(i+interval-1),epgain:EPCalc(voltage,i,tbonus),remaining:end-start})+"\n"
					/*"Step "+(step++)+") Using "+voltage+" voltage w/"+Math.round(tbonus*100)+"% team, score between "+i+"~"+(i+interval-1)+" pts. EP +"+EPCalc(voltage,i,tbonus)+". Remaining:"+(end-start)+" EP \n"*/
					return true
				}
			}
			/*for (var i=maxscore;i>=0;i-=interval) {
				if ((start+EPCalc(voltage,i,tbonus))==end) {
					//document.getElementById("console").value+="Ending value needs to be "+EvenOdd(end-10)+"\n"
					//document.getElementById("console").value+=EvenOdd(start+EPCalc(voltage,i,tbonus))+"/"+EvenOdd(end-10)+"\n"
					start+=EPCalc(voltage,i,tbonus)
					flameCount+=voltage
					document.getElementById("console").value+="Step "+(step++)+") Using "+voltage+" voltage w/"+Math.round(tbonus*100)+"% team, score between "+i+"~"+(i+interval-1)+" pts. EP +"+EPCalc(voltage,i,tbonus)+". Remaining:"+(end-start)+" EP \n"
					return true
				}
			}*/
			for (var i=maxscore;i>=0;i-=interval) {
				if (EvenOdd(start+EPCalc(voltage,i,tbonus))!=EvenOdd(end-10)&&(((start+EPCalc(voltage,i,tbonus))==end)&&((end-start)%2==1||(end-start)>26))) {
					//document.getElementById("console").value+="Ending value needs to be "+EvenOdd(end-10)+"\n"
					//document.getElementById("console").value+=EvenOdd(start+EPCalc(voltage,i,tbonus))+"/"+EvenOdd(end-10)+"\n"
					start+=EPCalc(voltage,i,tbonus)
					flameCount+=voltage
					document.getElementById("console").value+=ConvertVariables(LANGUAGE("%STEP%"),{step:step++,voltage:voltage,percent:Math.round(tbonus*100),lowscore:i,highscore:(i+interval-1),epgain:EPCalc(voltage,i,tbonus),remaining:end-start})+"\n"
					/*"Step "+(step++)+") Using "+voltage+" voltage w/"+Math.round(tbonus*100)+"% team, score between "+i+"~"+(i+interval-1)+" pts. EP +"+EPCalc(voltage,i,tbonus)+". Remaining:"+(end-start)+" EP \n"*/
					return true
				}
			}
			return false
		}

		function TryEqualGain(voltage,tbonus) {
			for (var i=maxscore;i>=0;i-=interval) {
			//document.getElementById("console").value+=(start+EPCalc(voltage,i,tbonus))+"/"+end+"\n"
				if (((start+EPCalc(voltage,i,tbonus))==end)&&((end-start)%2==1||(end-start)>26)) {
					//document.getElementById("console").value+="Ending value needs to be "+EvenOdd(end-10)+"\n"
					//document.getElementById("console").value+=EvenOdd(start+EPCalc(voltage,i,tbonus))+"/"+EvenOdd(end-10)+"\n"
					start+=EPCalc(voltage,i,tbonus)
					flameCount+=voltage
					document.getElementById("console").value+=ConvertVariables(LANGUAGE("%STEP%"),{step:step++,voltage:voltage,percent:Math.round(tbonus*100),lowscore:i,highscore:(i+interval-1),epgain:EPCalc(voltage,i,tbonus),remaining:end-start})+"\n"
					/*"Step "+(step++)+") Using "+voltage+" voltage w/"+Math.round(tbonus*100)+"% team, score between "+i+"~"+(i+interval-1)+" pts. EP +"+EPCalc(voltage,i,tbonus)+". Remaining:"+(end-start)+" EP \n"*/
					return true
				}
			}
			if (end==start) {
				return false
			} else {
				return undefined
			}
		}

		function TryMatchingRehearsal(tbonus) {
			//document.getElementById("console").value+=(Math.round(tbonus*10))+10
			if (end-start==(Math.round(tbonus*10))+10) {
				var gain=(Math.round(tbonus*10))+10
				start+=gain
				document.getElementById("console").value+=ConvertVariables(LANGUAGE("%REHEARSAL%"),{step:step++,percent:Math.round(tbonus*100),epgain:gain,remaining:end-start})+"\n"
				/*"Step "+(step++)+") Use Rehearsal w/"+Math.round(tbonus*100)+"% team. EP +"+gain+". Remaining:"+(end-start)+" EP \n"*/
				return false
			}
			return true
		}

		function TryRehearsal(tbonus) {
			if (end==start) {
				return false
			}
			var voltage=0
			if ((end-start)%2!==0) {
				return undefined
			}

			if (end-start>(10+Math.round(tbonus*10))+10) {
				var gain=(10+Math.round(tbonus*10))
				start+=gain
				//document.getElementById("console").value+="1)"
				document.getElementById("console").value+=ConvertVariables(LANGUAGE("%REHEARSAL%"),{step:step++,percent:Math.round(tbonus*100),epgain:gain,remaining:end-start})+"\n"
				/*"Step "+(step++)+") Use Rehearsal w/"+Math.round(tbonus*100)+"% team. EP +"+gain+". Remaining:"+(end-start)+" EP \n"*/
				return true
			} else 
			for (var j=tbonus;j>=0;j-=0.2) {
				result = TryMatchingRehearsal(j)
				if (!result) {
					return false
				}
			}
			if (end-start>=20) {
				var gain=end-start-10
				start+=gain
				//document.getElementById("console").value+="2)"
				document.getElementById("console").value+=ConvertVariables(LANGUAGE("%REHEARSAL%"),{step:step++,percent:((gain-10)*10),epgain:gain,remaining:end-start})+"\n"
				/*"Step "+(step++)+") Use Rehearsal w/"+((gain-10)*10)+"% team. EP +"+gain+". Remaining:"+(end-start)+" EP \n"*/
				return true
			} else 
			if ((end-start)%10==0) {
				var gain=10
				start+=gain
				//document.getElementById("console").value+="3)"
				document.getElementById("console").value+=ConvertVariables(LANGUAGE("%REHEARSAL%"),{step:step++,percent:0,epgain:gain,remaining:end-start})+"\n"
				/*"Step "+(step++)+") Use Rehearsal w/0% team. EP +"+gain+". Remaining:"+(end-start)+" EP \n"*/
				return false
			} else 
			{
				var gain=end-start
				if (((gain-10)*10)>=0) {
					start+=gain
					//document.getElementById("console").value+="4)"
					document.getElementById("console").value+=ConvertVariables(LANGUAGE("%REHEARSAL%"),{step:step++,percent:((gain-10)*10),epgain:gain,remaining:end-start})+"\n"
					/*"Step "+(step++)+") Use Rehearsal w/"+((gain-10)*10)+"% team. EP +"+(gain)+". Remaining:"+(end-start)+" EP \n"*/
					return false					
				} else {
					return undefined
				}
			}

			return false
			/*var voltage=0
			if (end-start>36) {
				start+=26
				document.getElementById("console").value+="Step "+(step++)+") Use Rehearsal w/"+(1.6*100)+"% team. EP +"+EPCalc(voltage,1,1.6)+". Remaining:"+(end-start)+" EP \n"
				return true
			} else
			if (end-start>20) {
				var bonus = (end-start-20)*10
				var gain = end-start-10
				start+=end-start-10
				document.getElementById("console").value+="Step "+(step++)+") Use Rehearsal w/"+(bonus)+"% team. EP +"+gain+". Remaining:"+(end-start)+" EP \n"
				if ((bonus/10)%2!=0) {
					return undefined
				} else {
					return true
				}
			} else {
				if (end-start<10||(end-start)%2!=0) {
					return undefined
				}
				var bonus = ((end-start-10)/20)*2
				start+=end-start
				document.getElementById("console").value+="Step "+(step++)+") Use Rehearsal w/"+((bonus)*100)+"% team. EP +"+EPCalc(voltage,1,bonus)+". Remaining:"+(end-start)+" EP \n"
				
				return false
			}
			return true*/
		}

		if ((end-start)>1000000) {
			document.getElementById("console").value=
			LANGUAGE("%LARGEGAP%")
			//"Get closer to target score before using parking calculator!"
		}
		 else {
			var result=true
			if (maxscore>0) {
				if (flexible) {
					for (var j=bonus;j>=0;j-=0.2) {
						while (TryBiggestGain(j)) {
							//document.getElementById("console").value+=+start+" EP"+"\n"
						}
						for (var i=4;i>0;i--) {
							while (TrySmallerGain(i,j)) {
								//document.getElementById("console").value+="Step "+(step++)+")"+start+" EP"+"\n"
							}
						}
						for (var i=5;i>0;i--) {
							while (TrySmolGain(i,j)) {
								//document.getElementById("console").value+="Step "+(step++)+")"+start+" EP"+"\n"
							}
						}
					}
				} else {
					while (TryBiggestGain(bonus)) {
						//document.getElementById("console").value+=+start+" EP"+"\n"
					}
					for (var i=4;i>0;i--) {
						while (TrySmallerGain(i,bonus)) {
							//document.getElementById("console").value+="Step "+(step++)+")"+start+" EP"+"\n"
						}
					}
					for (var i=5;i>0;i--) {
						while (TrySmolGain(i,bonus)) {
							//document.getElementById("console").value+="Step "+(step++)+")"+start+" EP"+"\n"
						}
					}
				}
			}
			for (var j=bonus;j>=0;j-=0.2) {
				result = TryMatchingRehearsal(j)
				if (!result) {
					break;
				}
			}
			if (result) {
				for (var j=1.6;j>=0;j-=0.2) {
					result = TryMatchingRehearsal(j)
					if (!result) {
						break;
					}
				}
			}
			if (result) {
				do {
						if (flexible) {
							for (var j=bonus;j>=0;j-=0.2) {
								var prevstart = 0
								result = TryRehearsal(j)
								if (start!==prevstart) {
									break;
								}
							}
						} else {
							result = TryRehearsal(bonus)
						}
				} while (result);
			}


			if (maxscore>0) {
				if (flexible) {
					for (var i=5;i>0;i--) {
						for (var j=bonus;j>=0;j-=0.2) {
							while (result = TryEqualGain(i,j)) {
								//document.getElementById("console").value+="Step "+(step++)+")"+start+" EP"+"\n"
							}
						}
					}
				} else {
					for (var i=5;i>0;i--) {
						while (result = TryEqualGain(i,bonus)) {
							//document.getElementById("console").value+="Step "+(step++)+")"+start+" EP"+"\n"
						}
					}
				}
			}
			
			function ConvertEvent(str) {
				switch (str) {
					case "Poker/Raid":{
						return LANGUAGE(4)
					}break;
					case "Bingo":{
						return LANGUAGE(5)
					}break;
					case "Medley":{
						return LANGUAGE(6)
					}break;
				}
			}

			start=end
			if (result===undefined) {
				document.getElementById("console").value=LANGUAGE("%FAILED%")
				//"Impossible to park using this team!"
			} else {
				document.getElementById("console").value=ConvertVariables(LANGUAGE("%INITIAL%"),{
				start:originalTarget,target:end,event:ConvertEvent(type),steps:(step-1),voltage:flameCount})+"\n\n"+document.getElementById("console").value
				/*"Calculating from "+originalTarget+" to "+end+" for event type "+type+"...\n\t(All games are done in Free Live)\n\nFound a park! "+(step-1)+" step"+Plural(step-1)+" and "+flameCount+" voltage required!\n\n"+document.getElementById("console").value*/
			}
			//document.getElementById("console").value+="Step "+(step++)+")"+start+" EP"+"\n"
			step++
		}
	}
