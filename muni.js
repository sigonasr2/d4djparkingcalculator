const MAXSTEPS= 10000
	
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
	
	var LANGUAGE=English
	var LANGUAGELIST={English:{name:"English",translation:English},Japanese:{name:"Japanese",translation:Japanese}/*,Korean:{name:"한국어",translation:Korean}*/}
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
	
	function toggleWarning() {
		setTimeout(() => {  document.getElementById("warningparktext").style.visibility=document.getElementById("flexible").checked?"visible":"hidden"},100)
	}

	function toggleBonus() {
		var bonusOptions = {};
		bonusOptions['noBonus'] = ['0','20','40','60','80','100','120','140','160'];
		bonusOptions['bonus'] = ['0','20','40','50','60','70','80','90','100','110','120','140','150','170','200'];

		var isBonus = document.getElementById("teambonus").checked;
		var bonusList = document.getElementById("bonus");
		while (bonusList.options.length) {
			bonusList.remove(0);
		}
		if (isBonus) {
			for (var i = 0; i < bonusOptions['bonus'].length; i++) {
				var entry = new Option(bonusOptions['bonus'][i] + "%", bonusOptions['bonus'][i] / 100);
				if (i==bonusOptions['bonus'].length-1) {
					entry.selected=true;	
				}
				bonusList.options.add(entry);
			}
		} else {
			for (var i = 0; i < bonusOptions['noBonus'].length; i++) {
				var entry = new Option(bonusOptions['noBonus'][i] + "%", bonusOptions['noBonus'][i] / 100);
				if (i==bonusOptions['noBonus'].length-1) {
					entry.selected=true;	
				}
				bonusList.options.add(entry);
			}
		}
	}
	
	/*function toggleBingo(){
		setTimeout(() => {  document.getElementById("hideBingo").style.visibility=document.getElementById("Bingo").checked?"visible":"hidden"},100)
	}*/

	function test(){
		
		var start = Math.abs(Math.max(0,Number(document.getElementById("starting").value)))
		var end = Math.abs(Math.max(0,Number(document.getElementById("ending").value)))
		var bonus = Number(document.getElementById("bonus").value)
		var isBonus = document.getElementById("teambonus").checked
		var parameter = Math.abs(Math.max(0,Number(document.getElementById("parameter").value)))
		var type = (document.getElementById("Bingo").checked?"Bingo":
		document.getElementById("Poker/Slots").checked?"Poker/Slots":
		document.getElementById("Raid").checked?"Raid":
		document.getElementById("RaidAnni").checked?"RaidAnni":
		"Medley")
		var flexible = document.getElementById("flexible").checked
		//document.getElementById("console").value=flexible+"...\n\n"
		var step=1
		var flameCount=0
		var originalTarget=start
		document.getElementById("console").value=""

		var interval = (type=="Medley")?15000:(type=="Poker/Slots")?4000:(type=="RaidAnni")?6000:10000
		
		var maxscore = Math.floor(Math.abs(Math.min(5000000,Math.max(0,Number(document.getElementById("maxscore").value))))/interval)*interval

		function EPCalc(voltage,score,bonus) {
			if (voltage>0) {
				switch (type) {
					case "Bingo":{
						return voltage * Math.floor((1 + bonus) * (Math.max(10, Math.floor(score/interval)) + Math.floor(parameter/600)))
					}break;
					case "Medley":{
						return voltage * Math.floor((1 + bonus) * (10 + Math.floor(score/interval) + Math.floor(parameter/600)))
					}break;
					case "Poker/Slots":{
						return voltage * Math.floor((1 + bonus) * (50 + Math.floor(score/interval) + Math.floor(parameter/600)))
					}break;
					case "Raid":{
						return voltage * Math.floor((1 + bonus) * (50 + Math.floor(score/interval) + Math.floor(parameter/600)))
					}break;
					case "RaidAnni":{
						return voltage * (300 + Math.floor(score/interval))
					}break;
				}
			} else {
				return Math.round(bonus*10)+10
			}
		}

		// Generate a list of possible bonus values the user can have, based on the selected drop down value and whether extra 10% bonus is applied
		var bonusOptions = [0,.2,.4,.5,.6,.7,.8,.9,1,1.1,1.2,1.4,1.5,1.7,2];
		function GenerateBonusRange(bonusValue, isBonus) {
			var array = [];
			if (isBonus) {
				for (var i=bonusValue;i>=0;i-=0.1) {
					i = Math.round(i * 10) / 10 // Eliminate precision problems
					if (bonusOptions.includes(i)) {
						array.push(i)
					}
				}
			} else {
				for (var i=bonusValue;i>=0;i-=0.2) {
					i = Math.round(i * 10) / 10
					array.push(i)
				}
			}
			return array
		}

		// During rehearsal, we can't use the odd bonus values, so return next lowest even value
		function GetNextBonus(bonusValue) {
			for (var i=bonusValue;i>=0;i-=0.1) {
				i = Math.round(i * 10) / 10
				if (bonusOptions.includes(i) && ((i*10)%2==0)) {
					return i
				}
			}
		}

		var bonusRange = GenerateBonusRange(bonus, isBonus)

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
				if (isBonus && (end-start >= 21)) {
					var gain = 0
					// If rehearsing with an odd gap, use 110% to flip back to even - only exception is 29, need to use 90%
					if (end-start==29){
						gain=19
					} else {
						gain=21
					}
					start+=gain
					document.getElementById("console").value+=ConvertVariables(LANGUAGE("%REHEARSAL%"),{step:step++,percent:((gain-10)*10),epgain:gain,remaining:end-start})+"\n"
					return true
				} else {
					return undefined
				}				
			}

			if (end-start>(10+Math.round(tbonus*10))+10) {
				var gain=(10+Math.round(tbonus*10))
				if (EvenOdd(end-start)!=EvenOdd(gain)) {
					tbonus = GetNextBonus(tbonus)
					gain=(10+Math.round(tbonus*10))
				}
				start+=gain
				//document.getElementById("console").value+="1)"
				document.getElementById("console").value+=ConvertVariables(LANGUAGE("%REHEARSAL%"),{step:step++,percent:Math.round(tbonus*100),epgain:gain,remaining:end-start})+"\n"
				/*"Step "+(step++)+") Use Rehearsal w/"+Math.round(tbonus*100)+"% team. EP +"+gain+". Remaining:"+(end-start)+" EP \n"*/
				return true
			} else 
			for (var j of GenerateBonusRange(tbonus,isBonus)) {
				result = TryMatchingRehearsal(j)
				if (!result) {
					return false
				}
			}
			if (end-start>=20) {
				var gain = 0
				if (isBonus && ((end-start)==38 || (end-start)==36)) { // If bonus exists, and gap is 36 or 38, need to do special exception because bonus teams can't reach 160% or 180%
					gain = 24
				} else {
					gain = end-start-10
				}
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
					for (var j of bonusRange) {
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
			for (var j of bonusRange) {
				result = TryMatchingRehearsal(j)
				if (!result) {
					break;
				}
			}
			if (result) {
				var maxBonus = (isBonus)?2.0:1.6 
				for (var j of GenerateBonusRange(maxBonus,isBonus)) {
					result = TryMatchingRehearsal(j)
					if (!result) {
						break;
					}
				}
			}
			if (result) {
				do {
					if (flexible) {
						for (var j of bonusRange) {
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
						for (var j of bonusRange) {
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
					case "Poker/Slots":{
						return LANGUAGE(4)
					}break;
					case "Bingo":{
						return LANGUAGE(5)
					}break;
					case "Medley":{
						return LANGUAGE(6)
					}break;
					case "Raid":{
						return LANGUAGE(24)
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
 
