window.BETheoryData = (() => {
  const sources = {
    exam:{name:'Vlaanderen.be — Category B theory exam',url:'https://www.vlaanderen.be/mobiliteit-en-openbare-werken/auto-en-motor/rijbewijzen-en-rijopleiding/rijbewijs-b/theorie-examen-voor-rijbewijs-b',note:'Official Flemish exam format, scoring, language support and validity.'},
    currentCode:{name:'Wegcode — Current Belgian Traffic Regulations',url:'https://www.wegcode.be/nl/regelgeving/1975120109~hra8v386pu',note:'Consolidated current traffic rules. This remains the applicable road code until 1 June 2027.'},
    speed:{name:'Wegcode — Speed limits by region',url:'https://www.wegcode.be/nl/verkeersreglement/uitleg-bij-het-verkeersreglement/snelheidsbeperkingen',note:'Current regional default speed limits, including Flanders.'},
    offences:{name:'Wegcode — Offences by degree',url:'https://www.wegcode.be/nl/verkeersovertredingen/overtredingen-per-graad',note:'Classification of second-, third- and fourth-degree offences.'},
    future:{name:'Wegcode — New Code of the Public Road',url:'https://www.wegcode.be/nl/code-van-de-openbare-weg',note:'The new rules are scheduled to enter into force on 1 June 2027; they are not the rules this course teaches.'},
    officialStudy:{name:'Mijn Rijbewijs B — Official study platform',url:'https://www.mijnrijbewijsb.be/studeren/',note:'Free Flemish study platform from VSV.'}
  };

  const lessons = [
    {id:'priority',num:1,title:'Priority & intersections',minutes:18,summary:'Master priority to the right, manoeuvres, roundabouts, trams and buses.',blocks:[
      {type:'key',title:'The default rule: priority to the right',html:'At an unsigned intersection, a driver normally gives way to a driver coming from the right. Under the <strong>current</strong> code, this does not apply when the driver from the right comes from a direction where entry is prohibited, and a driver already on a roundabout does not give way to a driver entering from the right.'},
      {type:'normal',title:'Signs override the default',html:'A <strong>Give Way (B1)</strong>, <strong>STOP (B5)</strong>, priority-road sign or traffic lights override the normal priority-to-the-right rule. At STOP you must actually stop, then give way.'},
      {type:'normal',title:'A manoeuvre changes everything',html:'A driver performing a manoeuvre must give way to other road users. Typical manoeuvres include reversing, making a U-turn, leaving a parking place, changing lanes and entering the road from private property.'},
      {type:'danger',title:'Rail vehicles and emergency vehicles',html:'Give priority to rail vehicles. When a priority vehicle approaches using its special audible signal, immediately clear the way, give priority and stop if necessary.'},
      {type:'normal',title:'Bus leaving a stop',html:'Inside a built-up area, a driver travelling in the same direction must allow a bus or trolleybus to leave its stop when the bus signals its intention. Slow down and stop if necessary.'}
    ],signs:['yield','stop','priority','roundabout']},
    {id:'speed',num:2,title:'Speed limits',minutes:16,summary:'Learn the Flemish defaults and the speed questions that can cost five points.',blocks:[
      {type:'danger',title:'Speed questions are high stakes',html:'On the Flemish theory exam, an incorrect answer about the permitted maximum speed costs <strong>5 points</strong>, not 1.'},
      {type:'key',title:'Flanders: Category B car defaults',html:'Unless signs impose another limit: <strong>50 km/h</strong> in built-up areas; <strong>70 km/h</strong> on ordinary roads outside built-up areas; and up to <strong>120 km/h</strong> on motorways and on roads with at least two lanes in each direction where the directions are physically separated. Always obey a lower posted limit.'},
      {type:'normal',title:'Special places',html:'A residential area / woonerf is limited to <strong>20 km/h</strong>. Raised traffic-calming devices must be approached carefully and are crossed at no more than <strong>30 km/h</strong>. Zone signs remain valid until you leave the zone.'},
      {type:'normal',title:'Safe speed can be below the limit',html:'A speed limit is a maximum, not a target. You must always be able to stop for a foreseeable obstacle and adapt to traffic, visibility, weather and road conditions.'},
      {type:'normal',title:'Do not mix up the regions',html:'This course is aimed at a Flemish Category B exam. Regional defaults differ: for example, Brussels generally uses 30 km/h in built-up areas and Wallonia generally uses 90 km/h on ordinary roads outside built-up areas. Road signs still take priority.'}
    ],signs:['speed30','speed50','speed70','speed120']},
    {id:'signals',num:3,title:'Traffic lights, signs & markings',minutes:20,summary:'Read the hierarchy correctly and recognise the signs you will see on the exam.',blocks:[
      {type:'key',title:'Red, amber, green',html:'Red means you may not pass the stop line or, if there is no stop line, the traffic light. Fixed amber also means stop, unless you are already so close that you cannot stop safely. Green means you may pass the light, but it does not remove other duties such as yielding while turning.'},
      {type:'danger',title:'Red-light errors are serious',html:'Ignoring a red traffic light is classified as a third-degree offence under the current rules. On the Flemish theory exam, a mistake on a question about a third- or fourth-degree offence costs 5 points.'},
      {type:'normal',title:'Flashing amber',html:'A flashing amber light warns of danger. You may pass it with extra caution, and it does <strong>not</strong> change the normal priority rules.'},
      {type:'normal',title:'Road markings',html:'A continuous white line normally may not be crossed where it separates traffic lanes. A yellow continuous line along the actual edge of the carriageway means stopping and parking are prohibited there; a yellow broken line prohibits parking.'},
      {type:'normal',title:'Traffic officer first',html:'Orders from an authorised person take priority over traffic lights, signs and markings. A raised arm means all road users must stop; users already on the intersection must clear it as soon as possible.'}
    ],signs:['noentry','noparking','nostopping','oneway']},
    {id:'vulnerable',num:4,title:'Pedestrians & cyclists',minutes:17,summary:'Know the exact duties around crossings and vulnerable road users.',blocks:[
      {type:'key',title:'Pedestrian crossings',html:'At an uncontrolled pedestrian crossing, approach at moderate speed and give way to pedestrians who are on the crossing <strong>or about to step onto it</strong>. Do not enter a crossing if congestion would probably leave you stopped on it.'},
      {type:'normal',title:'Cyclist crossing is different',html:'At a marked cyclist crossing, a cyclist who merely intends to cross does not automatically have priority. Drivers must approach at moderate speed and must not endanger cyclists already crossing; stop if necessary so they can finish.'},
      {type:'key',title:'Passing distance',html:'When a car or motorcycle passes a cyclist or a two-wheeled moped, leave at least <strong>1 metre</strong> in a built-up area and at least <strong>1.5 metres</strong> outside a built-up area.'},
      {type:'normal',title:'Extra care',html:'Drivers must exercise extra caution around vulnerable road users, especially children, older people and people with disabilities.'}
    ],signs:['pedestrian','bike','crossing']},
    {id:'parking',num:5,title:'Stopping & parking',minutes:18,summary:'Separate stopping from parking and remember the key distance rules.',blocks:[
      {type:'key',title:'Stopping vs parking',html:'A vehicle is “stopped” only for the time necessary for people to get in/out or for loading/unloading. Staying longer is parking. Charging an electric or hybrid vehicle is treated as parking.'},
      {type:'normal',title:'Where both stopping and parking are forbidden',html:'Never stop or park where you create obvious danger or unnecessary obstruction. This includes pedestrian crossings and the carriageway within 5 m before them, intersections where prohibited, and places where signs or markings forbid it.'},
      {type:'normal',title:'Parking-only rules worth memorising',html:'Parking is prohibited within <strong>15 m on either side</strong> of a bus, trolleybus or tram stop sign; in front of a property entrance except the vehicle whose registration is shown there; and wherever less than <strong>3 m</strong> of free carriageway would remain.'},
      {type:'normal',title:'Residential areas',html:'In a woonerf/erf, parking is only allowed in marked/coloured spaces bearing a P or where a sign allows it.'}
    ],signs:['noparking','nostopping']},
    {id:'motorway',num:6,title:'Motorways & major roads',minutes:13,summary:'Entry rules, minimum speed and the things you must never do.',blocks:[
      {type:'key',title:'Who can enter',html:'Motorways are not for pedestrians, cyclists, mopeds, animals, agricultural vehicles or vehicles/tows that cannot reach <strong>70 km/h</strong> on a level road.'},
      {type:'normal',title:'Minimum while driving',html:'Unless a lower speed is imposed, a driver on a motorway may not drive below <strong>70 km/h</strong>. This never overrides the obligation to adapt speed to traffic or dangerous conditions.'},
      {type:'danger',title:'Never on a motorway',html:'Do not reverse, make a U-turn, drive against traffic, use cross connections, or stop/park except in designated parking areas or when traffic/emergency circumstances force you.'},
      {type:'normal',title:'Joining traffic',html:'Use the acceleration lane to build an appropriate speed and merge when safe. Traffic already on the motorway does not lose priority merely because you are reaching the end of the entry lane.'}
    ],signs:['motorway','speed120']},
    {id:'safe-driving',num:7,title:'Safe driving, alcohol & phones',minutes:15,summary:'Rules that keep you legal and reduce the biggest everyday risks.',blocks:[
      {type:'danger',title:'Phone/screens',html:'While your vehicle is not stopped or parked, you may not use, hold or manipulate a mobile electronic device with a screen unless it is fixed in a holder intended for that purpose.'},
      {type:'key',title:'Alcohol',html:'For ordinary drivers, driving becomes punishable from <strong>0.5 g/L blood alcohol</strong> (0.22 mg/L exhaled alveolar air). Professional drivers have a lower 0.2 g/L threshold. The safest exam and real-world rule is simple: if you drink, do not drive.'},
      {type:'normal',title:'Seat belts',html:'Use seat belts where fitted. Children must be transported using the legally required approved restraint system appropriate to their size and situation.'},
      {type:'normal',title:'Following distance',html:'Leave enough distance to stop safely if the vehicle ahead slows suddenly. Increase the gap in rain, poor visibility, slippery conditions or when towing.'}
    ],signs:[]},
    {id:'lights',num:8,title:'Lights, visibility & emergencies',minutes:12,summary:'Visibility rules, breakdowns, level crossings and priority vehicles.',blocks:[
      {type:'key',title:'When lights are required',html:'Motor vehicles must use the required front and rear lights between nightfall and daybreak and whenever visibility is insufficient to see clearly for about 200 m.'},
      {type:'normal',title:'Level crossings',html:'Never enter a level crossing when barriers are moving/closed, red flashing lights are active, the audible signal sounds, or congestion means you might have to stop on the crossing.'},
      {type:'danger',title:'Priority vehicle with siren',html:'Immediately clear the way and give priority. Stop if necessary. Do not create a second danger by making a sudden unsafe movement.'},
      {type:'normal',title:'Breakdown basics',html:'If your vehicle becomes immobilised, make yourself and the vehicle visible, move to a safer location when possible and use the required warning equipment. On a motorway, get behind the safety barrier when this can be done safely.'}
    ],signs:[]},
    {id:'exam',num:9,title:'Exam strategy',minutes:10,summary:'Know the scoring system and train for the way Flanders actually tests you.',blocks:[
      {type:'key',title:'Official format',html:'The Flemish Category B theory exam has <strong>50 multiple-choice questions</strong>. You start with 50 points and need at least <strong>41/50</strong> to pass.'},
      {type:'danger',title:'Five-point mistakes',html:'A wrong or unanswered normal question costs 1 point. A wrong answer about a third- or fourth-degree offence or the permitted maximum speed costs <strong>5 points</strong>.'},
      {type:'normal',title:'Time',html:'After the official question has been fully read, you get <strong>15 seconds</strong> to answer. Our optional training timer starts after the browser finishes reading the English question, where speech synthesis is available.'},
      {type:'normal',title:'English audio',html:'In Flanders you can request audio translation in English. The official exam presents the Dutch question/answers first and then the selected audio language. Check the current exam fee and arrangements on Vlaanderen.be before booking.'},
      {type:'normal',title:'After two failed attempts',html:'If you fail twice, you must complete 12 hours of theory lessons at a recognised driving school before a third attempt, unless an official exemption applies.'}
    ],signs:[]}
  ];

  const signs = [
    {id:'yield',code:'B1',name:'Give way',kind:'yield'},
    {id:'stop',code:'B5',name:'Stop and give way',kind:'stop'},
    {id:'priority',code:'B9',name:'Priority road',kind:'priority'},
    {id:'roundabout',code:'D5',name:'Roundabout — compulsory direction',kind:'roundabout'},
    {id:'speed30',code:'C43',name:'Maximum 30 km/h',kind:'speed',value:'30'},
    {id:'speed50',code:'C43',name:'Maximum 50 km/h',kind:'speed',value:'50'},
    {id:'speed70',code:'C43',name:'Maximum 70 km/h',kind:'speed',value:'70'},
    {id:'speed120',code:'C43',name:'Maximum 120 km/h',kind:'speed',value:'120'},
    {id:'noentry',code:'C1',name:'No entry',kind:'noentry'},
    {id:'noparking',code:'E1',name:'No parking',kind:'noparking'},
    {id:'nostopping',code:'E3',name:'No stopping or parking',kind:'nostopping'},
    {id:'oneway',code:'F19',name:'One-way traffic',kind:'oneway'},
    {id:'pedestrian',code:'D11',name:'Compulsory path for pedestrians',kind:'pedestrian'},
    {id:'bike',code:'D7',name:'Compulsory cycle path',kind:'bike'},
    {id:'crossing',code:'F49',name:'Pedestrian crossing',kind:'crossing'},
    {id:'motorway',code:'F5',name:'Motorway',kind:'motorway'}
  ];

  const q=(id,topic,text,answers,correct,explanation,penalty=1)=>({id,topic,text,answers,correct,explanation,penalty});
  const questions = [
    q('p01','priority','At an unsigned intersection, a car approaches from your right. What is the normal rule?',['You have priority','Give way to the car from the right','Both drivers must stop'],1,'The current Belgian default at an unsigned intersection is priority to the right.'),
    q('p02','priority','You are leaving a parking space and joining moving traffic. Who has priority?',['You do, if you indicate','The moving road users','The larger vehicle'],1,'Leaving a parking space is a manoeuvre. A driver performing a manoeuvre gives way to other road users.'),
    q('p03','priority','You arrive at a STOP sign and the road appears empty. What must you do?',['Slow down only','Stop, then give way before continuing','Continue if you can see clearly'],1,'B5 requires an actual stop and then giving way.'),
    q('p04','priority','A tram approaches an intersection. Which statement is the safest general rule?',['Rail vehicles must be given priority','Cars always have priority over trams','Priority to the right never applies to trams so ignore them'],0,'Road users must give priority to rail vehicles.'),
    q('p05','priority','Inside a built-up area, a bus ahead signals to leave its stop. You are travelling in the same direction. What do you do?',['Speed up to pass first','Let the bus leave; slow or stop if necessary','Only give way if the bus has blue lights'],1,'Inside built-up areas, drivers travelling in the same direction must allow a signalling bus/trolleybus to leave its stop.'),
    q('p06','priority','You are reversing out of a driveway onto a public road. What applies?',['Priority to the right','You are performing a manoeuvre and must give way','Vehicles on the public road must let you out'],1,'Reversing/entering from private property is a manoeuvre.'),
    q('p07','priority','Under the current rules, a driver already circulating on a roundabout sees a vehicle entering from the right. What is the general rule?',['The circulating driver gives way to the entrant','The circulating driver does not give way merely because the entrant is on the right','Both must stop'],1,'The current priority-to-the-right rule contains an exception for a driver already on a roundabout.'),
    q('p08','priority','A priority vehicle approaches with its special audible signal. What must you do?',['Keep your course unless it flashes headlights','Immediately clear the way and give priority; stop if needed','Only react at an intersection'],1,'The audible signal requires road users to clear the way and give priority.'),
    q('p09','priority','You change lanes on a multi-lane road. Who must give way?',['The driver changing lane','The driver already in the destination lane','Whoever is slower'],0,'Changing lanes is a manoeuvre.'),
    q('p10','priority','You turn left across the path of oncoming traffic. What must you normally do?',['Give way to the oncoming traffic','Turn first because you signalled','Stop only for trucks'],0,'A driver turning left must not cut across oncoming traffic that has priority.'),

    q('s01','speed','In Flanders, what is the default maximum speed for a Category B car inside a built-up area when no other sign applies?',['30 km/h','50 km/h','70 km/h'],1,'The Flemish default inside built-up areas is 50 km/h unless signs impose another limit.',5),
    q('s02','speed','In Flanders, on an ordinary road outside a built-up area with no other speed sign, what is the default maximum for a Category B car?',['70 km/h','90 km/h','120 km/h'],0,'The Flemish default on ordinary roads outside built-up areas is 70 km/h.',5),
    q('s03','speed','What is the general maximum for a Category B car on a Belgian motorway when no lower limit is posted?',['90 km/h','100 km/h','120 km/h'],2,'The general maximum for cars up to 3.5 t on motorways is 120 km/h.',5),
    q('s04','speed','What is the maximum speed in a woonerf/erf?',['20 km/h','30 km/h','50 km/h'],0,'Residential areas/woonerf are limited to 20 km/h.',5),
    q('s05','speed','You see a C43 sign showing 30. What is the maximum speed from that sign while it remains applicable?',['20 km/h','30 km/h','50 km/h'],1,'C43 sets the indicated maximum speed.',5),
    q('s06','speed','In Flanders, a road outside a built-up area has at least two lanes per direction and the directions are physically separated. With no lower sign, what can the Category B maximum be?',['70 km/h','90 km/h','120 km/h'],2,'On this type of physically separated road, the Flemish maximum for cars up to 3.5 t can be 120 km/h.',5),
    q('s07','speed','A raised traffic-calming device is subject to what maximum crossing speed under the current rules?',['20 km/h','30 km/h','50 km/h'],1,'Raised devices must be approached carefully and crossed at no more than 30 km/h.',5),
    q('s08','speed','A sign sets 70 km/h, but heavy rain makes 70 unsafe. What speed should you choose?',['Exactly 70','A lower speed adapted to the conditions','At least 60'],1,'A posted limit is a maximum; you must adapt your speed to conditions.'),
    q('s09','speed','Which statement about regional speed defaults is correct?',['They are identical everywhere in Belgium','They can differ between Flanders, Brussels and Wallonia','Only motorway speeds differ'],1,'Regional default limits differ, while posted signs still take priority.',5),
    q('s10','speed','In a Flemish built-up area a 30 km/h zone sign is active. What is your maximum?',['30 km/h until the zone ends','50 km/h after the next side street','70 km/h if the road is wide'],0,'A zonal speed restriction remains in force until the zone ends.',5),

    q('l01','signals','A traffic light turns fixed amber and you can stop safely before the line. What must you do?',['Stop','Accelerate through','Treat it like green'],0,'Fixed amber means stop unless you are already too close to stop safely.'),
    q('l02','signals','What does a red traffic light mean?',['You may proceed if no one is coming','Do not pass the stop line or the light if there is no stop line','Stop only if pedestrians are present'],1,'Red forbids passing the stop line/light.',5),
    q('l03','signals','What does flashing amber mean?',['Full stop','Danger: pass with extra caution; normal priority rules remain','You have priority'],1,'Flashing amber warns of potential danger and does not change priority.'),
    q('l04','signals','An authorised traffic officer gives an instruction that conflicts with a green light. Which do you follow?',['The green light','The officer','Whichever is safer to you'],1,'Orders from authorised persons take priority over traffic signals.'),
    q('l05','signals','An authorised traffic officer raises one arm straight up. What does this mean?',['All road users must stop; those already on the intersection clear it','Only traffic behind the officer stops','It means turn right'],0,'A raised arm means all road users must stop; traffic already in the intersection clears it.',5),
    q('l06','signals','A yellow broken line is painted along the actual edge of the carriageway. What does it prohibit?',['Parking','All stopping, including passenger drop-off','Overtaking'],0,'A yellow broken edge line prohibits parking.'),
    q('l07','signals','A yellow continuous line is painted along the actual edge of the carriageway. What does it prohibit?',['Parking only','Stopping and parking','Driving above 30'],1,'A yellow continuous edge line prohibits stopping and parking.'),
    q('l08','signals','You have green and turn across pedestrians who are lawfully finishing their crossing. What should you do?',['Force them to stop because you have green','Let them finish safely','Sound the horn and continue'],1,'A green light does not remove your duty toward pedestrians already lawfully crossing.'),

    q('v01','vulnerable','At an uncontrolled pedestrian crossing, a pedestrian is clearly about to step onto it. What must you do?',['Give way','Continue until they are physically on it','Only stop for children'],0,'Drivers must give way to pedestrians on or about to enter an uncontrolled pedestrian crossing.'),
    q('v02','vulnerable','Traffic is queued beyond a pedestrian crossing. Can you enter if you are likely to stop on the crossing?',['Yes, if the light is green','No','Only for less than 30 seconds'],1,'Do not enter a pedestrian crossing if traffic is likely to leave you stopped on it.'),
    q('v03','vulnerable','In a built-up area, what minimum lateral distance should a car leave when passing a cyclist?',['0.5 m','1 m','1.5 m'],1,'The minimum is 1 m in built-up areas.'),
    q('v04','vulnerable','Outside a built-up area, what minimum lateral distance should a car leave when passing a cyclist?',['1 m','1.5 m','2 m'],1,'Outside built-up areas the minimum is 1.5 m.'),
    q('v05','vulnerable','A cyclist is waiting at a marked cyclist crossing but has not started crossing. Does the crossing by itself automatically give the cyclist priority?',['Yes','No','Only at night'],1,'A cyclist who merely intends to cross does not automatically gain priority from the cyclist crossing marking.'),
    q('v06','vulnerable','A cyclist is already crossing at a marked cyclist crossing. How should you approach?',['At moderate speed; do not endanger them and stop if needed','Accelerate so you clear first','The cyclist must always reverse'],0,'Drivers must approach at moderate speed and allow a cyclist already crossing to finish safely.'),
    q('v07','vulnerable','Who deserves extra caution under the general safety rule?',['Only pedestrians','Vulnerable road users, especially children, older people and people with disabilities','Only motorcyclists'],1,'The code explicitly requires extra caution around more vulnerable road users.'),
    q('v08','vulnerable','A pedestrian is walking on the carriageway where this is permitted. What minimum side distance should you normally keep in a built-up area?',['At least 1 m','At least 20 cm','There is no minimum'],0,'The current rules require at least 1 m from a pedestrian on the carriageway, with 1.5 m outside built-up areas.'),

    q('pk01','parking','You stop only as long as needed for a passenger to get out. Under the legal definition, this is generally considered:',['Parking','Stopping','Abandoning the vehicle'],1,'Stopping covers the time necessary for passengers to get in/out or loading/unloading.'),
    q('pk02','parking','You wait ten minutes for a friend with no loading/unloading or boarding taking place. This is generally:',['Stopping','Parking','A traffic jam'],1,'Remaining longer than needed for boarding/loading is parking.'),
    q('pk03','parking','How close may you park to a bus, trolleybus or tram stop sign under the general rule?',['Not within 5 m before it only','Not within 15 m on either side','You may park directly beside it at night'],1,'Parking is prohibited within 15 m on either side of the stop sign.'),
    q('pk04','parking','You want to park but would leave only 2.5 m of free carriageway. Is that allowed?',['Yes','No','Only with hazard lights'],1,'Parking is prohibited where less than 3 m of free carriageway would remain.'),
    q('pk05','parking','Can you normally park in front of another property’s driveway?',['Yes, if you stay in the car','No','Yes after 18:00'],1,'Parking in front of a property entrance is prohibited, except for the vehicle whose registration is displayed on that entrance.'),
    q('pk06','parking','In a woonerf, where may you park?',['Anywhere along the kerb','Only in marked/coloured P spaces or where a sign allows it','Only on the pavement'],1,'Parking in woonerf/erf is limited to specifically permitted spaces.'),
    q('pk07','parking','Is charging an electric or hybrid car treated as parking under the current definition?',['Yes','No, it is loading','Only if over one hour'],0,'Charging an electric or hybrid vehicle is treated as parking.'),
    q('pk08','parking','May you stop on a pedestrian crossing to let a passenger out?',['Yes if it takes under one minute','No','Only with hazard lights'],1,'Stopping and parking on pedestrian crossings are prohibited.'),

    q('m01','motorway','A vehicle cannot reach 70 km/h on a level road. May it use a motorway?',['Yes','No','Only in the right lane'],1,'Motorway access is prohibited to vehicles/tows that cannot reach 70 km/h on a level road.'),
    q('m02','motorway','Unless a lower speed is imposed, what is the normal minimum driving speed on a motorway?',['50 km/h','70 km/h','90 km/h'],1,'The current rule sets 70 km/h as the motorway minimum, subject to adapting speed to conditions.'),
    q('m03','motorway','May you reverse on a motorway if you miss your exit?',['Yes, on the hard shoulder','No','Only for 50 m'],1,'Reversing on a motorway is forbidden.'),
    q('m04','motorway','May you make a U-turn through a motorway cross-connection?',['Yes if traffic is light','No','Only with hazard lights'],1,'Using cross-connections and making a U-turn on a motorway are forbidden.'),
    q('m05','motorway','You are entering a motorway from an acceleration lane. Who has priority?',['You, because your lane ends','Traffic already on the motorway','Whoever is driving faster'],1,'Merging is a manoeuvre; traffic already on the motorway has priority.'),
    q('m06','motorway','Can pedestrians use a motorway?',['Yes on the hard shoulder','No','Only in daylight'],1,'Pedestrians are prohibited from motorways.'),

    q('sd01','safe-driving','While driving, may you hold your phone to read a navigation instruction if you do not type anything?',['Yes','No','Only below 30 km/h'],1,'A driver may not use, hold or manipulate a mobile electronic screen device while the vehicle is not stopped or parked unless the device is fixed in an intended holder.'),
    q('sd02','safe-driving','Your smartphone is fixed in a proper holder. Does the road code’s specific “held device” prohibition still ban the mounted device itself?',['The device may be mounted, but you must still drive safely and avoid distraction','Yes, mounted devices are always illegal','Only passengers may see it'],0,'The specific rule allows a screen device fixed in an intended holder, but distraction and safe-control duties still apply.'),
    q('sd03','safe-driving','For an ordinary driver, from what blood-alcohol concentration are you in violation?',['0.2 g/L','0.5 g/L','0.8 g/L'],1,'For ordinary drivers the threshold is 0.5 g/L blood (0.22 mg/L exhaled alveolar air).'),
    q('sd04','safe-driving','Professional drivers are subject to which lower alcohol threshold?',['0.2 g/L blood','0.5 g/L blood','1.0 g/L blood'],0,'Professional drivers are subject to the lower 0.2 g/L threshold.'),
    q('sd05','safe-driving','The road is wet and visibility is poor. What should happen to your following distance?',['Decrease it','Increase it','Keep exactly one car length'],1,'Poor conditions increase stopping distance and uncertainty, so leave a larger safety gap.'),
    q('sd06','safe-driving','A posted speed limit is:',['A target speed','The maximum, while conditions can require slower driving','The minimum speed'],1,'You must always adapt your speed to the circumstances.'),

    q('e01','lights','When must a car use the required front and rear lights?',['Only after midnight','Between nightfall and daybreak and when visibility is insufficient to see clearly for about 200 m','Only in rain'],1,'The current code requires lights at night and when visibility is insufficient to see clearly to about 200 m.'),
    q('e02','lights','At a level crossing, the red lights begin flashing. What do you do?',['Cross quickly before the barriers close','Do not enter','Cross if no train is visible'],1,'It is forbidden to enter when red flashing lights are active.'),
    q('e03','lights','Traffic is backed up beyond a level crossing and you may have to stop on the tracks. May you enter?',['Yes if the barrier is open','No','Only if another car does it first'],1,'You must not enter a level crossing if congestion means you are likely to stop on it.'),
    q('e04','lights','An emergency vehicle has blue lights but no audible siren. Does the special rule requiring every road user to immediately clear the way under Article 38 apply solely because of the blue lights?',['The Article 38 duty is triggered by the special audible signal','Yes, blue light alone always triggers exactly the same Article 38 wording','You should block it until the siren starts'],0,'Under the current Article 38 wording, the immediate clear-way duty is triggered when the special audible signal announces the vehicle. You should still act prudently around any emergency vehicle.'),
    q('e05','lights','A motorway breakdown forces you to stop. Which approach is safest?',['Remain in a live lane','Make the vehicle visible, move to a safer position when possible and get behind the barrier when safe','Walk along the carriageway to find help'],1,'The priority is to prevent a secondary collision and move occupants away from live traffic when this can be done safely.'),

    q('x01','exam','How many questions are on the Flemish Category B theory exam?',['40','50','60'],1,'The official exam has 50 multiple-choice questions.'),
    q('x02','exam','What score do you need to pass the Flemish Category B theory exam?',['40/50','41/50','45/50'],1,'You need at least 41/50.'),
    q('x03','exam','How many points do you lose for a normal wrong or unanswered question?',['1','2','5'],0,'A normal wrong or unanswered question costs 1 point.'),
    q('x04','exam','How many points can a wrong answer about the permitted maximum speed cost?',['1','3','5'],2,'Maximum-speed mistakes cost 5 points in the Flemish Category B theory exam.'),
    q('x05','exam','How many points can a wrong answer about a third- or fourth-degree offence cost?',['1','2','5'],2,'Third- and fourth-degree offence questions carry a 5-point loss.'),
    q('x06','exam','After the official question is fully read, how long do you normally have to answer?',['10 seconds','15 seconds','30 seconds'],1,'The official exam gives 15 seconds after the question has been fully read.'),
    q('x07','exam','Can the Flemish Category B theory exam be taken with English audio translation?',['Yes','No','Only for residents of the UK'],0,'Flanders offers audio translation in English, French or German for the theory exam.'),
    q('x08','exam','After failing the theory exam twice, what is normally required before a third attempt?',['Wait six months','Complete 12 hours of theory lessons at a recognised driving school','Take the practical exam first'],1,'After two failed attempts, 12 hours of recognised theory training are normally required before the third attempt.'),
    q('x09','exam','How long is a passed Flemish Category B theory exam generally valid?',['1 year','2 years','3 years'],2,'A passed theory exam is valid for 3 years.'),
    q('x10','exam','The new Belgian/Flemish Code of the Public Road is currently scheduled to enter into force on:',['1 June 2027','1 September 2026','1 January 2028'],0,'The current consolidated timeline says the new code enters into force on 1 June 2027. Until then the current 1975 regulations remain applicable.')
  ];

  return {sources,lessons,signs,questions,verified:'10 September 2026',version:'1.0.0'};
})();
