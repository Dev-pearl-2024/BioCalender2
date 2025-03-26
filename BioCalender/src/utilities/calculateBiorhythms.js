import moment from "moment";

function calculateBiorhythm(dob, target) {
  const birthDate = new Date(dob);
  const targetDate = target ? new Date(target) : new Date();

  const daysSinceBirth = Math.floor(
    (targetDate - birthDate) / (1000 * 60 * 60 * 24) + 1
  );

  let physicalBiorhythm = Math.round(daysSinceBirth % 23);

  if (physicalBiorhythm === 0) {
    physicalBiorhythm = 23;
  }

  let emotionalBiorhythm = Math.ceil(daysSinceBirth % 28);

  if (emotionalBiorhythm === 0) {
    emotionalBiorhythm = 28;
  }

  let intellectualBiorhythm = Math.round(daysSinceBirth % 33);
  if (intellectualBiorhythm === 0) {
    intellectualBiorhythm = 33;
  }

  return {
    rangePhysical: physicalBiorhythm,
    rangeEmotional: emotionalBiorhythm,
    rangeIntellectual: intellectualBiorhythm,
    textofEmotional: calcuteTextofEmotional(emotionalBiorhythm),
    textofPhysical: calcuteTextofPhysical(physicalBiorhythm),
    textofIntellectual: calcuteTextofIntellectual(intellectualBiorhythm),
    description: calculateDescription(
      calcuteTextofPhysical(physicalBiorhythm) +
        calcuteTextofEmotional(emotionalBiorhythm) +
        calcuteTextofIntellectual(intellectualBiorhythm)
    )
  };
}
const calcuteTextofPhysical = (rangePhysical) => {
  var physicalText = "";
  if (rangePhysical == 1) {
    return (physicalText = "c");
  } else if (rangePhysical == 12 || rangePhysical == 13) {
    return (physicalText = "C");
  } else if (rangePhysical == 7) {
    return (physicalText = "H");
  } else if (rangePhysical == 18) {
    return (physicalText = "L");
  } else if (rangePhysical > 1 && rangePhysical < 7) {
    return (physicalText = "+");
  } else if (rangePhysical > 7 && rangePhysical < 12) {
    return (physicalText = "#");
  } else if (rangePhysical > 13 && rangePhysical < 18) {
    return (physicalText = "-");
  } else if (rangePhysical > 18 && rangePhysical < 24) {
    return (physicalText = "*");
  }
};
const calcuteTextofEmotional = (rangeEmotional) => {
  var emotionalText = "";
  if (rangeEmotional == 1) {
    return (emotionalText = "c");
  } else if (rangeEmotional == 15 || rangeEmotional == 16) {
    return (emotionalText = "C");
  } else if (rangeEmotional == 8) {
    return (emotionalText = "H");
  } else if (rangeEmotional == 22) {
    return (emotionalText = "L");
  } else if (rangeEmotional > 1 && rangeEmotional < 8) {
    return (emotionalText = "+");
  } else if (rangeEmotional > 8 && rangeEmotional < 15) {
    return (emotionalText = "#");
  } else if (rangeEmotional > 16 && rangeEmotional < 22) {
    return (emotionalText = "-");
  } else if (rangeEmotional > 22 && rangeEmotional < 29) {
    return (emotionalText = "*");
  }
};
const calcuteTextofIntellectual = (rangeIntellectual) => {
  var intellectualText = "";
  if (rangeIntellectual == 1) {
    return (intellectualText = "c");
  } else if (rangeIntellectual == 17 || rangeIntellectual == 18) {
    return (intellectualText = "C");
  } else if (rangeIntellectual == 9) {
    return (intellectualText = "H");
  } else if (rangeIntellectual == 26) {
    return (intellectualText = "L");
  } else if (rangeIntellectual > 1 && rangeIntellectual < 9) {
    return (intellectualText = "+");
  } else if (rangeIntellectual > 9 && rangeIntellectual < 17) {
    return (intellectualText = "#");
  } else if (rangeIntellectual > 18 && rangeIntellectual < 26) {
    return (intellectualText = "-");
  } else if (rangeIntellectual > 26 && rangeIntellectual < 34) {
    return (intellectualText = "*");
  }
};

export const calculateDescription = (text) => {
  let description = "";
  switch (text) {
    case "ccc":
      description =
        "Starting over. These are the biorhythms you had when you were born. According to some biorhythm researchers, this occurs 58 years and 67 days after your birthdate. For several days you will have three '+'s (a plus in each cycle).  Very positive outcomes usually take place with these bios as each phase progresses upward, higher towards the peak or 'H' symbol. Rating: 6";
      break;
    case "cc+":
      description =
        "With these bios you are just starting to enter into the positive phase of all three of your biorhythmic phases; Physical, Emotional and Intellectual. You should have exceptional opportunities for success in any of your endeavors for several days. Rating: 6";
      break;
    case "ccH":
      description =
        "With these bios you are just starting to enter into the positive phase in both the Physical and Emotional cycles. You should have exceptional opportunities for success in any of you endeavors for several days. You also have an intellectual high where you are in top form with your judgment and decision-making.Rating: 6";
      break;
    case "cc#":
      description =
        "With these bios you are just starting to enter into the positive phase in both the Physical and Emotional cycles. You should have exceptional opportunities for success in any of you endeavors for several days Rating: 6";
      break;
    case "ccC":
      description =
        "You 're just starting to enter into the positive phase in both the Physical and Emotional cycles. You should have exceptional opportunities for success in any of your endeavors for several days. With an intellectual caution you may want to re-think your decisions to bluff, raise or call Rating: 3";
      break;
    case "cc-":
      description =
        "You're just starting to enter into the positive phase in both the Physical and Eemotional cycles. You should have exceptional opportunities for success in any of your endeavors for several days. You are heading downward in your Intellectual cycle so you may want to re-think your your bluffing strategies and statistical mental calculations Rating: 3";
      break;
    case "ccL":
      description =
        "Not a good day for mental, decision- making issues. Give careful second thoughts on business strategies as well as mental calculations of probabilities and risks to take. Your memory may also be impaired today Rating: 0";
      break;
    case "cc*":
      description =
        "You're heading in the right direction toward getting to where you want to be for superior luck and skill. A few more days and you'll find that your peak in the Emotional cycle should yield some unusually lucky events. Look for the 8 or 'H' in the Emotional cycle Rating: 5";
      break;
    case "c+c":
      description =
        "Today and for several days as you head upward in each of your biorhythmic cycles you should have increasing success and luck for all of your activities Rating: 7";
      break;
    case "c++":
      description =
        "Today and for several days as you head upward in each of your biorhythmic cycles you should have lots of energy to give you the luck and solid decision-making that can make you a real winner! Rating: 8";
      break;
    case "c+H":
      description =
        "Today and for several days as you head upward in each of your biorhythmic cycles you should have lots of energy to give you the luck and solid decision-making that can help to make you successful! Rating: 9";
      break;

    case "c+#":
      description =
        "Today and for several days as you head upward in each of your biorhythmic cycles you should have lots of energy to give you the luck and solid decision-making that can make you a real winner! Rating: 8";
      break;

    case "c+C":
      description =
        "Today and for several days as you head upward in each of your biorhythmic cycles you should have lots of energy to give you the luck and solid decision-making that can make you a real winner! The only difficulty may be the negative effect of the caution in your Intellectual cycle that governs judgment, decision-making and memory Rating: 5";
      break;

    case "c+-":
      description =
        "All looks good except for the in the Intellectual cycle. Be wary of your judgment or decisions and give some second thoughts to your business and betting strategies. Rating: 5";
      break;

    case "c+L":
      description =
        "All looks good except for the low point in your Intellectual cycle Rating: 3";
      break;
    case "c+*":
      description =
        "You have a better than average shot at Successful business outcomes today. Rating: 6";
      break;
    case "cHc":
      description =
        "The emotional peak day which is the 8th day of this cycle represents potential for highly unusual luck. Hands dealt to you should be better than normal and certainly better than when you have a  in the Emotional cycle Rating: 7";
      break;

    case "cH+":
      description =
        "The emotional peak day which is the 8th day of this cycle represents potential for highly unusual luck. Hands dealt to you should be better than normal and certainly better than when you have a in the Emotional cycle Rating: 8";
      break;

    case "cHH":
      description =
        "You're flying high today! Good solid day to get it all done!  You're at the peak in both the Emotional and Intellectual cycles. Today may be an exceptionally lucky day for you!! The emotional peak day which is the 8th day of this cycle represents potential for highly unusual luck. Hands dealt to you should be better than normal and certainly better than when you have a in the Emotional cycle. Rating: 9";
      break;
    case "cH#":
      description =
        "You're flying high today! Good solid day to get it all done!  You're at the peak in both the Emotional and Intellectual cycles. Today may be an exceptionally lucky day for you!! The emotional peak day which is the 8th day of this cycle represents potential for highly unusual luck. Hands dealt to you should be better than normal and certainly better than when you have a '-' in the Emotional cycle. Rating: 8";
      break;
    case "cHC":
      description =
        "You're flying high today! Good solid day to get it all done!  You're at the peak in both the Emotional and Intellectual cycles. Today may be an exceptionally lucky day for you!! The emotional peak day which is the 8th day of this cycle represents potential for highly unusual luck. Hands dealt to you should be better than normal and certainly better than when you have a '-' in the Emotional cycle. The only caveat is your Intellectual cycle. Caution - double-check your work and think twice before acting Rating: 7";
      break;
    case "cH-":
      description =
        "This has the potential to be a highly lucky day for you with the 'H' in your Emotional cycle. Caveat: '-' heading downward in the Intellectual cycle. Judgment may be impaired. Rating: 6";
      break;
    case "cHL":
      description =
        "This has the potential to be a highly lucky day for you with the 'H' in your Emotional cycle. Caveat: Low point in the Intellectual cycle. Judgment and memory may be impaired - more so today than other days in the Intellectual cycle. Rating: 5";
      break;
    case "cH*":
      description =
        "This has the potential to be a highly lucky day for you with the 'H' in your Emotional cycle. Very good business potential.Rating: 6";
      break;
    case "c#c":
      description =
        "Things should start shaping up nicely for your business or work. When you do right things, right things happen.Rating: 6";
      break;
    case "c#+":
      description =
        "Good potential for business and betting! Go for it! Rating: 7";
      break;
    case "c#H":
      description =
        "Good potential for business and betting! Go for it! Rating: 8";
      break;
    case "c#C":
      description =
        "Caution Intellectual cycle today may have some impact on judgment. Rating: 6";
      break;
    case "c#-":
      description =
        "Should be a good day with the positive in your Emotional cycle but be wary of the Intellectual cycle '-' as it tends to impair decision-making abilities. Rating: 6";
      break;
    case "c#L":
      description =
        "Be wary of the Intellectual cycle low 'L' as it tends to impair decision-making abilities. Rating: 4";
      break;
    case "c#*":
      description =
        "Have a nice day!  It should be better than average. Rating: 6";
      break;
    case "cCc":
      description =
        "With this series of bios you may feel a bit 'off' today meaning you may not feel as you normally feel. Be wary of the Caution emotionally as this tends to make you overly sensitive and take things too seriously. Shake it off! Rating: 5";
      break;
    case "cC+":
      description =
        "With this series of bios you may feel a bit 'off' today meaning you may not be what you normally are. Be wary of the Caution emotionally as this may make you take things too seriously when they may not need to be. Shake it off! Rating: 6";
      break;
    case "cCH":
      description =
        "With this series of bios you may feel a bit 'off' today meaning you may not be what you normally are. Be wary of the Caution emotionally as this may make you take things too seriously when they may not need to be. Shake it off! 'Temper is what gets most of us in trouble. Pride is what keeps us there'. Mark Twain Rating: 7";
      break;
    case "cC#":
      description =
        "With this series of bios you may feel a bit 'off' today meaning you may not be what you normally are. Be wary of the Caution emotionally as this may make you take things too seriously when they may not need to be. Shake it off! 'Temper is what gets most of us in trouble. Pride is what keeps us there' -  Mark Twain Rating: 6";
      break;
    case "cCC":
      description =
        "In this series of mini-caution and cautions, it's very likely that you will feel tense and even irritable. This is not a good combination of biorhythms because emotionally you may have a tendency to be too tense and too anxious which may give your opponents too much information. The Intellectual cycle caution may cause you to make some errors in judgment. Rating: 2";
      break;
    case "cC-":
      description =
        "In this series of mini-caution and cautions, it's very likely that you will feel tense and even irritable. Try restraint as you may have a tendency to make hasty decisions today based upon emotions rather than good judgment. Rating: 2";
      break;
    case "cCL":
      description =
        "This is a difficult combination of your biorhythmic cycles. The 'L' represents your Intellectual cycle at a low point, which means that your judgment and memory may be impaired today. In this series of mini-caution and cautions, it's very likely that you will feel tense and even irritable. If you do feel this way, you would save a lot of money by not playing games of chance today. Your emotions and poor decisions may cost you. On the bright side, you may get some good luck since some unusual luck has occurred with the Emotional cycle Caution. Your problems will most likely be from the low point intellectually. Rating: 1";
      break;
    case "cC*":
      description =
        "The Caution in your Emotional cycle may make you feel irritable or more sensitive to issues than normal. Watch for those good hands but be careful not to act hastily based upon emotions. Rating: 2";
      break;
    case "c-c":
      description =
        "Your '-' in your Emotional cycle may be the cause of some problems for you. This usually means a reduction in self-confidence, more negative reactivity and less positive proactivity. Your Physical and Intellectual cycles are just moving upward enough to be pluses tomorrow. Rating:2 There is a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 7";
      break;
    case "c-+":
      description =
        "The '-' in your Emotional cycle means that it is being depleted of energy. If you have activities that require confidence and luck you may want to put them off for a few days at least until you have a positive in your Emotional cycle.Rating:5 It's not the pace of life that concerns me,it's the sudden stop at the end.  There is a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 7";
      break;
    case "c-H":
      description =
        "Your minus Emotional cycle today may be the cause of some problems for you. This usually means a reduction in self-confidence; more negative reactivity and less positive proactivity. Your Physical cycle will be positive tomorrow and you're at the peak intellectually.Rating:6 There is a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 8";
      break;
    case "c-#":
      description =
        "Your minus Emotional cycle today may be the cause of some problems for you. This usually means a reduction in self-confidence; more negative reactivity and less positive proactivity. Your Physical cycle will be positive tomorrow and you at least have a positive in your Intellectual cycle. Rating:5 There is a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 8";
      break;
    case "c-C":
      description =
        "Not a good combo of bios for successful business. The '-' in your emotional cycle is the worst of the four sections of each cycle. This means you're heading downward below the line. Don't worry it only lasts for a few days then you'll see the '*' which will help you rejuvenate or recharge your energy level. Rating: 1 There is a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 7";
      break;
    case "c--":
      description =
        "The likelihood of catching a high number of good hands is remote today. With a double minus '--' in the Emotional and Intellectual cycles, your probability of winning today is substantially reduced. It's best to wait for these minuses to become asterisks '**' or even better, pluses '++'. It's only a few days away. Avoid important discussions or decisions today. Rating: -2 There is a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 5";
      break;
    case "c-L":
      description =
        "Accept that some days you're the pigeon, and some days you're the statue. With these bios you may get messy. You have a minus Emotional cycle and you're at the very bottom of your Intellectual cycle. These bios are usually not good for business. Rating: -3 There is a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 4";
      break;
    case "c-*":
      description =
        "Your minus Emotional cycle is still with you so it will most likely be a blah day for business.Rating:0 There is a possibility for unusual luck if the lunar phase is a New Moon, or Waxing Gibbous on this date. Rating: 6";
      break;
    case "cLc":
      description =
        "At least tomorrow you'll have pluses on both the Physical and Intellectual cycles. Possibility for some good hands but I find that they are more plentiful at the peak 'H' emotionally.Rating:4 There is a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous, or Waxing Crescent on this date. Rating: 8";
      break;
    case "cL+":
      description =
        "The 'L' has been known to be very lucky for many people since it's a mini-caution and one of the four days that you have the potential for highly unusual luck. The eighth day of the Emotional cycle is much better for most people - the 'H' on the chart symbolizes it.Rating:4 There is a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous, or Waxing Crescent on this date. Rating: 8";
      break;
    case "cLH":
      description =
        "You're at the peak intellectually. The 'L' on the Emotional cycle has been known to be very lucky for many people since it is a mini-caution and one of the four days that you have the potential for highly unusual luck. The eighth day of the emotional cycle is much better for most people - the 'H' on the chart symbolizes it.Rating:7 There is a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 10";
      break;
    case "cL#":
      description =
        "The 'L' on the emotional cycle has been known to be very lucky for many people since it is a mini-caution and one of the four days that you have the potential for highly unusual luck. The eighth day of the emotional cycle is much better for most people - the 'H' on the chart symbolizes it.Rating:7 There is a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 9";
      break;
    case "cLC":
      description =
        "With this series of mini-caution and Caution points in your biorhythm, it's very likely that you may feel a bit 'off' and not your normal energized self.Rating:3 There is a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 7";
      break;
    case "cL-":
      description =
        "The 'L' or low point in your Emotional cycle today doesn't mean that it will be a difficult day from the perspective of your emotions. It's more likely that the '-' in your Intellectual cycle will have more of an adverse effect on your ability to think clearly and make appropriate decisions.Rating:0 There is a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 0";
      break;
    case "cLL":
      description =
        "Accept that some days you're the pigeon, and some days you're the statue. With these bios, it may get messy. You're at the bottom of the Emotional and Intellectual cycles. A good day to take it easy and think twice before taking action. What may cause your losses today is your judgment and not the hands that you receive.\nRating: -1\n\nThere is a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date.Raing:5 ";
      break;
    case "cL*":
      description =
        "The 'L' or low point in your Emotional cycle today doesn't mean that it will be a difficult day from the perspective of your emotions. You're recharging intellectually, so it may be a good day to do research, read, or just take it easy and not take on critically important tasks today.Rating:1\n\nThere is a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 6";
      break;
    case "c*c":
      description =
        "Physically and intellectually, you'll have pluses tomorrow. Start preparing yourself for the pluses that you'll want to take advantage of when they arrive.Rating:3\n\nThere is a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date.Rating: 7";
      break;
    case "c*+":
      description =
        "Although you're recharging emotionally, this should be slightly better than an average day for you.Rating:6\n\nThere is a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date.Rating: 10";
      break;
    case "c*H":
      description =
        "Although you're recharging emotionally, this should be better than an average day for you.Rating:6\n\nThere is a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating: 10";
      break;
    case "c*#":
      description =
        "Potential: Slightly better than average Rating:6.\n\nIn spite of the cost of living, it's still popular. - Kathleen Norris\n\nThere is a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating: 9";
      break;
    case "c*C":
      description =
        "The Caution in your Intellectual cycle may make it difficult to make sound decisions today.Rating:3\n\nThere is a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating: 6";
      break;
    case "c*-":
      description =
        "You're heading downward in the Intellectual cycle, so you may want to think twice before betting and playing games of chance.Rating:-1\n\nThere is a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating: 5";
      break;
    case "c*L":
      description =
        "With your Intellectual cycle low point 'L', be cautious of decisions you may make today. Rating:-1\n\nThere is a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating:5\n\n\"Men give me credit for some genius. All the genius I have lies in this: When I have a subject in hand, I study it profoundly. Day and night it is before me. My mind becomes pervaded with it. Then the effort which I have made is what people are pleased to call the fruit of genius. It is the fruit of labor and thought\". - Alexander Hamilton Rating: -1";
      break;
    case "c**":
      description =
        "You're just recharging - a good day to relax and take it easy - if you can afford to do so. Rating:5\n\nThere is a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating: 7";
      break;
    case "+cc":
      description =
        "Both your Emotional and Intellectual cycles are just heading upward and will be pluses tomorrow. This will give you three pluses for several days. Take advantage of three pluses whenever you have them since you can get great things accomplished. Rating: 6";
      break;
    case "+c+":
      description =
        "You'll have three pluses starting tomorrow. With three pluses, great things can happen for you and to you. Rating: 7";
      break;
    case "+cH":
      description =
        "Things should really be shaping up for you, especially as you move into a triple plus phase where all three of your cycles; Physical, Emotional, and Intellectual are positive. Rating: 8";
      break;
    case "+c#":
      description =
        "You'll have three pluses starting tomorrow. With three pluses, great things can happen for you and to you. Rating: 7";
      break;
    case "+cC":
      description =
        "The Caution or Critical in your Intellectual cycle may cause some memory lapses or errors in judgment. Be more cautious in your decision-making today. Rating: 4";
      break;
    case "+c-":
      description =
        "Physically, you should have plenty of energy, but the Intellectual cycle minus may not lead to the result that you really want. Rating: 5";
      break;
    case "+c*":
      description =
        'Tomorrow should be the start of good potential for business, and this "streak" should last for several days. A positive in the Emotional cycle is far better than having a minus. You can test this by tracking the kinds of luck that you get with a positive and compare that to the kinds of luck that you get with a minus in the Emotional cycle. A great way to test your casino play. Rating: 6';
      break;
    case "++c":
      description =
        "Your positive in the Emotional cycle should get you some great business deals. The 'c' in your Intellectual cycle does not normally have as much of a negative impact as the 'C' or the 'L'. Tomorrow you have triple pluses, and that's where you have some great opportunities for success in business, sports, gaming, and gambling in casinos. Rating: 8";
      break;
    case "+++":
      description =
        "CONGRATULATIONS!! You have a plus in each of your three biorhythmic cycles. The probability for your success in all of your endeavors is enhanced during this period. Of all the combinations of biorhythmic cycles, this combination is the best for attaining the most favorable results in your personal and business life, as well as for games of chance. Rating: 10";
      break;
    case "++H":
      description =
        "CONGRATULATIONS!! It doesn't get much better than this! You have a plus in each of your three biorhythmic cycles. The probability for your success in all of your endeavors is enhanced during this period. Of all the combinations of biorhythmic cycles, this combination is the best for attaining the most favorable results in your personal and business life, as well as for luck in the casinos. Rating: 10";
      break;
    case "++#":
      description =
        "Excellent biorhythms! You should do very well in all of your endeavors today. This has the potential to be a great day for business. Rating: 9";
      break;
    case "++C":
      description =
        "The Caution in your Intellectual cycle may create some decision-making difficulties for you, but if you more carefully weigh your decisions today, you should have some successful luck in the casinos. Rating: 7";
      break;
    case "++-":
      description =
        "With a positive in both Physical and Emotional cycles, you have the opportunity for a good day in any sport. Be wary of your business decisions today. Rating: 7";
      break;
    case "++L":
      description =
        "The 'L' in your Intellectual cycle may create some decision-making difficulties for you, but if you take extra time to give serious thought to important hands you should be fine. The plus in your Emotional cycle will help with catching some decent hands and with your confidence level, but the intellectual low may create problems with your memory and decision-making.\n\n\"It's not that I'm so smart, it's just that I stay with problems longer.\" - Albert Einstein Rating: 6";
      break;
    case "++*":
      description =
        "Your potential is excellent for optimizing your chances for a successful business outing.  Rating: 7";
      break;
    case "+Hc":
      description =
        "This could be a very lucky day for you! You're at the peak emotionally with a physical plus to boot! These are great biorhythms for business, sports, and gambling. Today is one of the four days each month where you have the potential for highly unusual luck based on energy levels and surges in energy. This program identifies these days for you – just watch for the 'H', 'L', 'C' in your Emotional cycle.\n\nThe best for most people is the 'H', so you may want to plan on spending more time during these positive biorhythmic periods working on your business. The positives are: 'c', '+', 'H', and '#'. These symbols are only good during these lunar phases: First Quarter, Last Quarter, Full Moon, Waning Crescent, and Waning Gibbous. If you have these positives during what I call the Negative lunar phases, they will not have the desired positive effect.\n\nIf you're in a casino, try various games of chance, including slot machines. Rating:8";
      break;
    case "+H+":
      description =
        "CONGRATULATIONS!! You can do no wrong today!! You're not only in the midst of three pluses, but you're at the peak of your Emotional cycle. This is an exceptional biorhythm. Don't be surprised if you catch some very unusual hands or hit some remarkable jackpots in the slot machines! Unusual luck often occurs during this day of the emotional cycle, which biorhythm researchers have labeled \"bio-luck.\" These are the days to buy your lottery tickets and go to the casinos to take advantage of your good luck.\n\nDuring the 45-year period of personally testing days where I have been very lucky and have tested when others have had highly unusual luck, it is when we are at the peak emotionally while in the midst of Triple positives (when the Physical and Intellectual cycles are '+', 'H', or '#'). This only occurs a few times each year for each of us. Rating: 10+ ";
      break;
    case "+HH":
      description =
        "IT'S CASINO TIME!! CONGRATULATIONS!! You can do no wrong today!! You're not only in the midst of three positives, but you are at the peak of your Emotional and Intellectual cycles. This is an exceptional biorhythm. If you can't win today, you should increase your efforts in business or sports for exceptional results. Rating:10+";
      break;
    case "+H#":
      description =
        "Time for exceptional Business, Sports, or Gambling activities!!\n\nCONGRATULATIONS!! You're not only in the midst of three positives, but you are at the peak of your Emotional cycle. This is an exceptional biorhythm. You should do well in all of your endeavors. Very unusual luck often occurs during this day of the Emotional cycle, which biorhythm researchers have labeled \"bio-luck.\"During the past forty-five years I have tracked a number of lottery and slot machine winners who had their emotional cycle at their peak - just as yours is today. Keep in mind, however, that with odds of several million to one to overcome in winning the lottery the above information does not guarantee that you will win each time you have the 'H' in the emotional cycle. However, after many years of research and documentation, I believe your chances of having unusually good luck are increased significantly today and each day that you have an 'H' or often with an 'L' in the Emotional cycle or middle symbol shown above.  If you have an opportunity to play games of chance in a casino you'll find that you'll do very well with your Emotional cycle at the 'H' when compared with other negative '-' periods of this cycle.  You don't have this biorhythm very often so go out and have a great time. You should do well in whatever you choose to do! Rating: 10";
      break;
    case "+HC":
      description =
        "The 'H' should bring you confidence and luck, but be wary of how you benefit from these positive factors since the intellectual Caution may make it difficult to make correct decisions. Rating: 7";
      break;
    case "+H-":
      description =
        "This can be a very lucky day as you're at the peak emotionally or the eighth day of the Emotional cycle. Unusual luck often occurs on this date. The only cycle to be cognizant of is the Intellectual cycle, where your energies are depleted, which could have a negative impact on your creativity, judgment, and memory. Rating: 7";
      break;
    case "+HL":
      description =
        "Great bios today except for the 'L', which is the worst symbol to have in the Intellectual cycle since it means you're at the very bottom of the cycle. This creates difficulties with memory and judgment. The 'H' in the Emotional cycle may be able to offset any problems with your memory and judgment . Rating: 6";
      break;
    case "+H*":
      description =
        "IT'S CASINO TIME! CONGRATULATIONS!! You're not only in the midst of three pluses, but you're at the peak of your Emotional cycle. Don't be surprised if you catch some very unusual hands. Unusual luck often occurs during this day of the emotional cycle, which biorhythm researchers have labeled \"bio-luck.\" Rating:8";
      break;
    case "+#c":
      description =
        "You should do better than your average day today. My copyrighted BioRating goes from -3 to +10. A minus 3 represents a negative in each of your three biorhythmic cycles: Physical, Emotional, and Intellectual (P E I). Rating:7";
      break;
    case "+#+":
      description =
        "You have great potential for sales and closing deals. Your business strategy should be right on!   Rating: 9";
      break;
    case "+#H":
      description =
        "CONGRATULATIONS!! You're not only in the midst of three positives, but you are at the peak of your Intellectual cycle. This is a very good biorhythm. You should do quite well in your business activities. You don't have this biorhythm very often, so go out and have a great time - you should do quite well in all of your endeavors.  Rating: 10";
      break;
    case "+##":
      description =
        "You have an excellent opportunity to do well in all of your business endeavors. The position of your three biorhythmic cycles is almost as positive as +++. Go out and seize the day! Rating: 9";
      break;
    case "+#C":
      description =
        "Your bios still look good, although your Caution in the intellectual cycle may have a slight impact on your decision-making. Rating: 7";
      break;
    case "+#-":
      description =
        "A great day for most of your business activities. With poor intellectual bios, your strategies may not work as well as you might like. Rating: 7";
      break;
    case "+#L":
      description =
        "Your bios are great except for the Intellectual cycle 'L', which usually makes it difficult to remember things and judgment may be impaired today. Think through your business strategy carefully today. Rating: 5";
      break;
    case "+#*":
      description = "You should do very well in business today. Rating: 8";
      break;
    case "+Cc":
      description =
        "Things may get a little intense today - best to back off a bit. Rating: 6";
      break;
    case "+C+":
      description =
        "This should be a great business day if you remember not to take things too seriously or overreact. Try to keep cool if you want to end up with a successful and winning day. Rating: 7";
      break;
    case "+CH":
      description =
        "This should be a great day if you remember not to take things too seriously or overreact. Avoid any confrontational situations today. Rating: 8";
      break;
    case "+C#":
      description =
        "This should be a great business day if you remember not to take things too seriously or overreact. Try to keep cool if you want to end up with a successful and winning day. Rating: 7";
      break;
    case "+CC":
      description =
        "This should be a great day if you remember not to take things too seriously or overreact. Today it is especially important to realize that you also have an intellectual Caution, which may tend to aggravate an emotional situation since your judgment may be impaired. Rating: 5";
      break;
    case "+C-":
      description =
        "This should be a great day if you remember not to take things too seriously or overreact. Today it is especially important to realize that you also have an intellectual Caution, which may tend to aggravate an emotional situation since your judgment may be impaired. Rating: 4";
      break;
    case "+CL":
      description =
        "This should be a great day if you remember not to take things too seriously or overreact. Avoid any confrontational situations today. Today it is especially important to realize that you also have an intellectual low 'L' which may tend to aggravate an emotional situation since your judgment may be impaired. Rating: 3";
      break;
    case "+C*":
      description =
        "Be wary of the Critical or Caution represented by the 'C' which may make you feel intense or you may tend to overreact to things today. It's important that you have this emotional bio today so you are better able to understand why you may take things more seriously than you normally would. Rating: 5";
      break;
    case "+-c":
      description =
        "Physically you should have plenty of energy but emotionally you may feel drained.Rating:6 There is a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous or on this date . Rating: 8";
      break;
    case "+-+":
      description =
        "Your Physical and Intellectual cycles are fine, however, you may find that today you're lacking your normal proactive approach to life that you normally possess. No need to be too concerned because in a few days you'll be back to your normal confident self.Rating:7 There is a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous or on this date. Rating: 9";
      break;
    case "+-H":
      description =
        "Your Physical and Intellectual cycles are fine, however, you may find that today you're lacking your normal proactive approach to life that you normally possess. No need to be too concerned because in a few days you'll be back to your normal confident self.Rating:7 There is a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous or on this date. Rating: 10";
      break;
    case "+-#":
      description =
        "Physical endurance and strength are fine and intellectually things should go well. However, your ability to remain positive and do things with confidence may be more difficult than normal for you today.Rating:7 There is a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous or on this date. Rating: 9";
      break;
    case "+-C":
      description =
        "Physically you're fine but emotionally and intellectually you may have difficulties. The '-' in the Emotional cycle means you are heading downward below the line, which, for luck, is the worst of the four sections of the biorhythmic cycle. It is usually evidenced by lower energy levels, less confidence and poor luck. The Intellectual cycle is a Caution so your judgment may be impaired as well.Rating:1 There is a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous or on this date. Rating: 6";
      break;
    case "+--":
      description =
        "You should have plenty of energy today but you may be down in the dumps emotionally and intellectually. This would not be a good day to attempt to engage in important business transactions today.Rating:-2 There is a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous or on this date. Rating: 5";
      break;
    case "+-L":
      description =
        "Not good bios for business. The '-' in the Emotional cycle means you are heading downward below the line, which is the worst of the four sections of the biorhythmic cycle for luck. It is usually evidenced by lower energy levels and less confidence. The Intellectual cycle is 'L' which means you're at the very bottom of this cycle so your judgment may be impaired.Rating:-2 There is a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous or on this date. Rating: 3";
      break;
    case "+-*":
      description =
        "The Emotional cycle '-' will be the most influential factor in determining success in business today. Unfortunately, your chances are lessened at this point of your biorhythm. If you have a choice consider delaying critically important business decisions to when your chances are increased. Your chances are increased when you have one of the symbols '+', '#', or 'H' in your emotional cycle.Rating:0 There is a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 6";
      break;
    case "+Lc":
      description =
        "The emotional 'L' has produced unusual Luck for many people but it is difficult to say whether it will be unusually good or unusually poor.Rating:8 There is a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating: 8";
      break;
    case "+L+":
      description =
        "If you play golf this combination of bios may yield a hole-in-one! After 35 years of golf my good friend never had a hole-in-one until one day where he had the above biorhythm. Again highly unusual luck occurred with the mini-caution on the emotional cycle. Several of my golfing friends have had their career or personal best in golf with one of the following bios: '-++', '+++', '+H+', '+L+', '*++', '###', '##+'. The key bio for exceptional performance in golf appears to be a positive in the Emotional cycle and Intellectual cycle simultaneously. While the Physical cycle was not as important as the other two. So when you want to play a super round of golf go out and play when you have one of these bios!Rating:9 There is a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating: 9";
      break;
    case "+LH":
      description =
        "You may catch some unusually good hands or your judgment may help you to win today. With the 'L' in the Emotional cycle it can go either way in terms of unusual luck.Rating:7 There is a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating:10";
      break;
    case "+L#":
      description =
        "The mini-caution 'L' in the Emotional cycle is really not a negative. Because of the changeover there may be a surge of energy at this point that generates unusual luck. I have seen numerous examples of this. For example, one friend won a $10 million lottery ticket at this same point in the emotional cycle. The baseball pitcher Randy Johnson pitched a \"perfect game\" with this biorhythm and was only the 17th player in baseball history to do so. Rating: 7 There is a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating: 9";
      break;
    case "+LC":
      description =
        "Usually when in a combination of Cautions and mini-Cautions it means that you will not feel quite right and your performance is less predictable. Rating: 5 There is a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating: 8";
      break;
    case "+L-":
      description =
        "The '-' in your Intellectual cycle is not good for your decision-making ability. The 'L' is not as predictable as the 'H' when it comes to luck. I believe the 'H' to be the best for Bio Luck. With the 'L' you do have potential for highly unusual luck.It's the intellectual 'L' that could give you some trouble with a reduction in memory and decision-making ability.Rating: -1 There is a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating: 5";
      break;
    case "+LL":
      description =
        "These bios may not be as bad as they look. You're emotionally and intellectually at the lowest point in those cycles but the emotional low has often yielded unusual luck. It's the intellectual 'L' that could give you some trouble with a reduction in memory and decision-making ability. Rating:-1 There is a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating: 6 Obstacles are those frightful things you see when you take your eyes off the goal. - Hannah More";
      break;
    case "+L*":
      description =
        "The 'L' in your emotional cycle may give you some unusual luck today. Rating:4 There is a possibility for unusual luck if the lunar phase is a Waxing Crescent. Rating: 7";
      break;
    case "+*c":
      description =
        "This appears to be an average day. Re-charging in your emotional cycle may make you feel somewhat lazy or lethargic, so you may want to kick back and relax today. Rating: 6 There is a possibility for unusual luck if the lunar phase is a Waxing Crescent. Rating: 7";
      break;
    case "+*+":
      description =
        'Although you\'re recharging emotionally you can overcome the possible Lackadaisical feelings that you may have today by "psyching yourself up" to meet the challenge of the day.The plus in the other two cycles will help you to do well in your work or business. Rating: 7 There is a possibility for unusual luck if the lunar phase is a Waxing Crescent. Rating: 10';
      break;
    case "+*H":
      description =
        'Although you\'re recharging emotionally you can overcome the possible Lackadaisical feelings that you may have today by "psyching yourself up" to meet the challenge of the day.The plus in the other two cycles will help you to do well in your work or business.  Rating: 7 There is a possibility for unusual luck if the lunar phase is a Waxing Crescent Rating:10';
      break;
    case "+*#":
      description =
        'Whenever you encounter the asterisk "*" on the emotional cycle you always have the opportunity to overcome any lackadaisical feelings that you may encounter.It would be easier if you had an emotional "+", "#", or "H" but this is not always possible.  So, you do the best you can no matter what biorhythmic cycles are affecting you. You do this by concentrating on positive, motivating factors that will help to "psyche you up" for greater performance in games of chance as well as business sports and personal family activities. Rating: 8 There is a possibility for unusual luck if the lunar phase is a Waxing Crescent Rating:9';
      break;
    case "+*C":
      description =
        "You should have plenty of energy but you may be somewhat lackadaisical because you're recharging your energies emotionally. Be wary of your intellectual Caution. Rating: 3 There is a possibility for unusual luck if the lunar phase is a Waxing Crescent Rating:6";
      break;
    case "+*-":
      description =
        "Limited opportunity for enhanced business performance. you will again require your emotions to motivate yourself to a point where you can be competitive.Rating:-1 There is a possibility for unusual luck if the lunar phase is a Waxing Crescent Rating:5.";
      break;
    case "+*L":
      description =
        "Double-check your work today. You may forget things that you normally take for granted and remember with ease.Rating:1 There is a possibility for unusual luck if the lunar phase is a Waxing Crescent. Rating:5";
      break;
    case "+**":
      description =
        "You should have plenty of energy today but you're recharging in your Emotional and Intellectual cycles. Have a nice mellow day.Rating:5 There is a possibility for unusual luck if the lunar phase is a Waxing Crescent. Rating: 8";
      break;
    case "Hcc":
      description =
        "This is the beginning of several days of exceptional biorhythms. You will be in the midst of three pluses where great things can happen for you. Tomorrow, go out and take advantage of these great bios! Rating: 6";
      break;
    case "Hc+":
      description =
        "You'll have three pluses tomorrow so get yourself prepared to take advantage of some very good times for you. Today should be better than average and your game should steadily improve for several days. Rating: 7";
      break;
    case "HcH":
      description =
        "You'll have three positives tomorrow so get yourself prepared to take advantage of some very good business opportunities for you. Rating: 8";
      break;
    case "Hc#":
      description =
        "You'll have three positives tomorrow so get yourself prepared to take advantage of some very good business opportunities for you. Rating: 8";
      break;
    case "HcC":
      description =
        "Be wary of your Caution on your intellectual cycle since it can hamper your decision-making. Rating: 4";
      break;
    case "Hc-":
      description = "Think twice with the intellectual minus. Rating: 4";
      break;
    case "HcL":
      description =
        "Today, think more than twice before finalizing a decision. Rating: 2";
      break;
    case "Hc*":
      description =
        "Double positives will occur tomorrow so get prepared for potentially good business opportunities. Rating: 5";
      break;
    case "H+c":
      description =
        "Great bios for business! A great time to take advantage of your opportunities! Rating: 8";
      break;
    case "H++":
      description =
        "You will find that you can do no wrong!! These are great bios so go out and take advantage of it! You should do quite well in your business activities today! If you think you can or you think you can't, you're right. - Henry Ford Rating: 10";
      break;
    case "H+H":
      description =
        "Super bios today! This should be a very hot day for you! You're at the peak physically and intellectually with a plus in the Emotional cycle. Essentially you're in the middle of three positives which is a great time to win in games of chance, make superb business transactions and close huge sales. Sports: You name the sport and you will do well! Dream as if you'll live forever. Live as if you'll die today. - James Dean Rating: 10";
      break;
    case "H+#":
      description =
        "Exceptional biorhythm today! Poker: Your competition doesn't stand a chance! You may even feel sorry for them after you defeat them without mercy. Business: Be sure to take advantage of this combination of each of your cycles. You have the potential to get a great deal done and be very successful in all of your business and personal endeavors. Of all the sad words of tongue or pen, the saddest are these: 'It might have been.' -Whittier Rating: 9";
      break;
    case "H+C":
      description =
        "A physical and emotional plus is a 'double-plus' which is great for sports. The intellectual cycle is a Caution, which may impair your judgment. Rating: 6";
      break;
    case "H+-":
      description =
        "A physical and emotional plus is a 'double plus' which is great for sports. The intellectual cycle is a '-', which may impair your judgment. Rating:7";
      break;
    case "H+L":
      description =
        "Great bios for sports but the intellectual 'L' is at the low point so your decision-making, memory and judgment will most likely be significantly impaired today. Rating: 5";
      break;
    case "H+*":
      description =
        "A physical and emotional plus is a double-plus, which is great for business! Rating: 7";
      break;
    case "HHc":
      description =
        "You're at the peak physically and emotionally so the double-plus is accentuated by having surges of energy in both. This may induce highly unusual luck as well as the potential to beat your personal or career best. Rating: 9";
      break;
    case "HH+":
      description =
        "CONGRATULATIONS!! It doesn't get any better than this! You're at the peak in both the Physical and Emotional biorhythmic cycles! With these bios you have the greatest chance of winning at games of chance such as slot machines, blackjack, bingo, keno, craps, poker or any other game of chance. Las Vegas, Reno, Lake Tahoe, Atlantic City, Monte Carlo and Macau will all be on their knees when you're through. Be sure to play smart with money management! Poker: Your competition doesn't stand a chance! You may even feel sorry for them after you defeat them without mercy. Business: If you don't close some huge deals today you may as well retire! Seriously, this series of bios is very rare so when you do get this kind of biorhythm you need to really take advantage of the opportunity. Of all the sad words of tongue or pen, the saddest are these: 'It might have been.' -Whittier Rating: 10";
      break;
    case "HHH":
      description =
        "CONGRATULATIONS!!  It doesn't get any better than this!  You're at the peak in all three of your biorhythmic cycles!  Three Peak Days! With these bios you have the greatest chance of winning at games of chance such as slot machines, blackjack, bingo, keno, craps, poker or any other game of chance. Poker:  Your competition doesn't stand a chance!  You may even feel sorry for them after you defeat them without mercy. Business:  If you don't close some huge deals today you may as well retire!  Seriously, this series of bios is very rare so when you do get this kind of biorhythm you need to really take advantage of the opportunity. Las Vegas, Reno, Lake Tahoe, Monte Carlo and Macau will all be on their knees when you're through. Be sure to play smart with money management! Rating: 10";
      break;
    case "HH#":
      description =
        "CONGRATULATIONS!!   You have three positives today and you're at the peak in the Physical and Emotional cycles. With these bios you have an excellent chance of winning at games of chance such as the slot machines, blackjack, bingo, keno, craps, pai gow poker or any of the other games of chance. Poker:  Your competition doesn't stand a chance!  You may even feel sorry for them after you defeat them without mercy. Business:  If you don't close some huge deals today you may as well retire!  Seriously, this series of bios is very rare so when you do get this kind of biorhythm you need to really take advantage of the opportunity. Las Vegas, Reno, Lake Tahoe, Monte Carlo and Macau will all be on their knees when you're through. Be sure to play smart with money management! Business:  If you don't close some huge deals today you may as well retire! Seriously, this series of bios is very rare so when you do get this kind of biorhythm you need to really take advantage of the opportunity. Rating: 10";
      break;
    case "HHC":
      description =
        "Great potential for a successful day in business. Rating: 9";
      break;
    case "HH-":
      description =
        "Great potential for a successful day in business and your personal life..  Rating:8";
      break;
    case "HHL":
      description =
        "Great potential for a successful day In business and your personal life. Double check your work today as the 'L' in your Intellectual cycle may affect your cognitive abilities.Great potential for a winning day For games of chance.  You should catch some very good hands. Be wary of your intellectual low point which may cause problems with judgment, memory and decision-making. Rating: 8";
      break;
    case "HH*":
      description =
        "Great potential for a very successful Day in business and games of chance. Rating: 8";
      break;
    case "H#c":
      description =
        "You have a double-plus today which should produce some excellent outcomes. Rating: 8";
      break;
    case "H#+":
      description =
        "Triple pluses today should make for a great business day! Excellent biorhythm for any sport in which you participate! Rating: 9";
      break;
    case "H#H":
      description =
        "Business:  If you don't close some huge deals today you may as well retire! Seriously, this series of bios is very rare so when you do get this kind of biorhythm you need to really take advantage of the opportunity. Triple pluses today should make for a great business day! Excellent biorhythm for any sport in which you participate! Rating: 10";
      break;
    case "H##":
      description =
        "With these bios you have a good chance of winning at games of chance such as the slot machines, blackjack, bingo, keno, craps, poker or any other game of chance. Business:  If you don't close some huge deals today you may as well retire! Seriously, this series of bios is very rare so when you do get this kind of biorhythm you need to really take advantage of the opportunity.  Rating:9";
      break;
    case "H#C":
      description =
        "Good bios - not great but you can do quite well in most of your endeavors. Be wary of your Caution in your Intellectual cycle. Rating: 7";
      break;
    case "H#-":
      description =
        "Good bios - not great - but you can do quite well in most of your endeavors. Be wary of your minus in the intellectual cycle. Rating: 7";
      break;
    case "H#L":
      description =
        "Good bios - not great - but you can do quite well in most of your endeavors. Be wary of your 'L' or low point in your Intellectual cycle. Rating: 6";
      break;
    case "H#*":
      description = "Your double positive is great for business. Rating: 7";
      break;
    case "HCc":
      description =
        "The 'C' or Caution in your Emotional cycle may make you feel more intense than normal. This can present problems in terms of over reacting in your business strategies. Rating: 7";
      break;
    case "HC+":
      description =
        "The 'C' or Caution in your Emotional cycle may make you feel more intense than normal.  You may find yourself over-reacting to issues that you usually wouldn't. Other than these issues you do have great potential for success in business, sports and your personal/romantic life as well . Rating: 8";
      break;
    case "HCH":
      description =
        'The "C" or Caution in your Emotional cycle may make you feel more intense than normal. You may find yourself over-reacting to issues that you usually wouldn\'t. Other than these issues you do have great potential for success in business, sports and your personal/romantic life as well Potential for great passion today. Rating: 9';
      break;
    case "HC#":
      description =
        "The 'C' or Caution in your Emotional cycle may make you feel more intense than normal. You may find yourself over-reacting to issues that you usually wouldn't. Other than these issues you have great potential for success in business, sports and your personal/romantic life as well. Rating: 8";
      break;
    case "HCC":
      description =
        "The intensity caused by the Caution in your Emotional cycle could be a problem if you let it. The Caution in your Intellectual cycle may not let you control it. Rating:4";
      break;
    case "HC-":
      description =
        "The intensity caused by the Caution in your Emotional cycle could be a problem if you let it. The '-' in your Intellectual cycle may not let you control it. Imagination is more important than knowledge - Albert Einstein Rating: 2";
      break;
    case "HCL":
      description =
        'The \'C\' in your Emotional cycle may make you take things more seriously than need be. The "L" intellectually can make you forgetful and affect your judgment. "The single biggest problem in communication is the illusion that it has taken place." -George Bernard Shaw Rating: 1';
      break;
    case "HC*":
      description =
        "Good day for sports where physical endurance and strength - in addition to emotional intensity are required. Rating: 6";
      break;
    case "H-c":
      description =
        "The '-' in your Emotional cycle is symbolic of depleted energies and is not good for most activities in business, sports or your personal life.Rating:5 There is a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 5";
      break;
    case "H-+":
      description =
        "The '-' in your emotional cycle is symbolic of depleted energies and is not good for most activities in business, sports or your personal life. The pluses in your Physical and Intellectual cycles may help to offset the negative impact of your depleted emotional energies.Rating:6 There is a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 8";
      break;
    case "H-H":
      description =
        'The minus "-" in your emotional cycle is symbolic of depleted energies and is not good for most activities in business, sports or your personal life. The pluses in your physical and intellectual cycles may help to offset the negative impact of your depleted emotional energies.Rating:7 There is a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 9';
      break;
    case "H-#":
      description =
        "The '-'\" in your Emotional cycle is symbolic of depleted energies and is not good for most activities in business, sports or your personal life. The pluses in your Physical and Intellectual cycles may help to offset the negative impact of your depleted emotional energies.Rating:7 There is a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 9";
      break;
    case "H-C":
      description =
        "You have a Caution in your Intellectual cycle and a '-' in your emotional cycle. The combination of these two create a scenario where you have depleted energies emotionally and impaired decision-making abilities. So, if you have an opportunity to postpone critical issues or projects it would be prudent to do so.Rating:3 There is a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 8";
      break;
    case "H--":
      description =
        "Poor business potential. You have a double minus from both your Emotional and Intellectual cycles. The combination of these two create a scenario where you have depleted energies in both cycles. So, if you have an opportunity to postpone critical business decisions it would be prudent to do so.Rating:-2 There is a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 4";
      break;
    case "H-L":
      description =
        "Poor business potential: You have an 'L' or mini-caution in your Intellectual cycle and a '-' in your Emotional cycle. The combination of these two create a scenario where you have depleted energies emotionally and impaired decision-making abilities. So, if you have an opportunity to postpone critical issues or projects it would be prudent to do so.Rating:-3 The single biggest problem in communication is the illusion that it has taken place. --George Bernard Shaw. There is a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 4";
      break;
    case "H-*":
      description =
        "The minus '-' in your Emotional cycle is symbolic of depleted energies and is not good for most activities in business or your personal life.Rating:0 There is a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 6";
      break;
    case "HLc":
      description =
        "Each of your three biorhythmic cycles are in either a mini-caution or caution. This usually will make you feel 'off' or out of the ordinary.Rating:6 There is a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous, or Waxing Crescent on this date. Rating: 8";
      break;
    case "HL+":
      description =
        "The mini-caution 'L' in the Emotional cycle is really not a negative. Because of the changeover there may be a surge of energy at this point that generates unusual luck. I have seen numerous examples of this. One example is my friend that golfed for thirty-five years and never got a hole-in-one. One day he finally got a hole-in-one and I ran his biorhythms and found that it was an 'L' or the 22nd day of his Emotional cycle. Another is an acquaintance that won a $10 million lottery ticket at this same point in the Emotional cycle.Rating:7 There is a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous, or Waxing Crescent on this date. Rating: 9";
      break;
    case "HLH":
      description =
        "At the very top in both your Physical and Intellectual cycles, but at the very bottom of your Emotional cycle. The mini-caution 'L' in the Emotional cycle is really not a negative. Because of the changeover there may be a surge of energy at this point that generates unusual luck. I have seen numerous examples of this. One is my friend who played golf for 35 years and finally got a hole-in-one with this series of biorhythms. Another is an acquaintance that won a $10 million lottery ticket at this same point in the Emotional cycle.Rating:10 There is a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous, or Waxing Crescent on this date. Rating: 10";
      break;
    case "HL#":
      description =
        "The mini-caution 'L' in the Emotional cycle is really not a negative. Because of the changeover there may be a surge of energy at this point that generates unusual luck.Rating:8 There is a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous, or Waxing Crescent on this date. Rating: 8";
      break;
    case "HLC":
      description =
        "Could be a good day but be wary of the effect of the Intellectual cycle caution.Rating:4 There is a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous, or Waxing Crescent on this date. Rating: 7";
      break;
    case "HL-":
      description =
        "The combination of the Emotional cycle low and Intellectual cycle '-' can produce negative outcomes for business success.Rating:-2 There is a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous, or Waxing Crescent on this date. Rating: 5";
      break;
    case "HLL":
      description =
        "The combination of Emotional and Intellectual cycle low points can produce negative outcomes in all phases of your business and personal life.Rating:-3 There is a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous, or Waxing Crescent on this date. Rating: 7";
      break;
    case "HL*":
      description =
        "'L' has often produced some interesting results, even though your emotional energies are depleted and your Intellectual cycle is recharging. Average outcomes can be expected but 'L' Has often produced some interesting results Rating:5 There is a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous, or Waxing Crescent on this date. Rating: 8";
      break;
    case "H*c":
      description =
        "Recharging in your Emotional cycle usually yields average results in business and less than your average in games of chance.Rating:6 There is a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating: 8";
      break;
    case "H*+":
      description =
        "Recharging in your Emotional cycle usually yields average results in business and less than your average in games of chance.Rating:7 There is a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating: 9";
      break;
    case "H*H":
      description =
        "Physically and intellectually you are at the peak. Emotionally you're still recharging.Rating:7 There is a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating: 10";
      break;
    case "H*#":
      description =
        "Recharging in your Emotional cycle usually yields average results in business and less than your average in games of chance.Rating:7 There is a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating: 9";
      break;
    case "H*C":
      description =
        "Re-charging in your Emotional cycle usually yields average results in business and less than your average in games of chance.Rating:3 You have a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating: 7";
      break;
    case "H*-":
      description =
        "Re-charging in your Emotional cycle usually yields average results in business and less than your average in games of chance.Rating:-1 You have a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating: 6";
      break;
    case "H*L":
      description =
        "Think twice and double-check your work today. You have a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating: -1";
      break;
    case "H**":
      description =
        "You're re-charging in both Emotional and Intellectual cycles usually leads to an average kind of day - nothing to really write home about.Rating:6 You have a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating: 8";
      break;
    case "#cc":
      description =
        "The lower case 'c' signifies the beginning of good things to come because you start to have pluses the day following the 'c'. Rating:5";
      break;
    case "#c+":
      description =
        "Tomorrow you will have an emotional plus which is the start of several days of good times and good things to happen. Rating: 6";
      break;
    case "#cH":
      description =
        "Tomorrow you will have an emotional plus which is the start of several days of good times and good things to happen. Rating: 7";
      break;
    case "#c#":
      description =
        "Tomorrow you will have an emotional plus which is the start of several days of good times and good things to happen. Rating: 7";
      break;
    case "#cc":
      description =
        "The 'c' in both your Emotional and Intellectual cycles should yield triple pluses tomorrow. Good things can happen with triple pluses!   Rating: 6";
      break;
    case "#c+":
      description =
        "Tomorrow you will have your emotional 'c' become a '+' and when this occurs you most likely will have three positives. This is a great time to get things accomplished because the likelihood is increased that you will have successful outcomes in your business and personal activities. Rating: 7";
      break;
    case "#cH":
      description =
        "Tomorrow you will have an emotional plus which is the start of several days of good times and good things to happen.   Rating: 8";
      break;
    case "#c#":
      description =
        "Tomorrow you will have an emotional plus which is the start of several days of good times and good things to happen.  Rating: 8";
      break;
    case "#c-":
      description =
        "Good things are shaping up but watch for the negative in your Intellectual cycle. Rating: 5";
      break;
    case "#+c":
      description = "It's beginning to look really good. Rating: 7";
      break;
    case "#++":
      description =
        "This is what you've been waiting for!! Now is the time to go out and make it happen! You're in the midst of triple pluses!! Why are you still sitting there?! Get to a casino or poker table ASAP to take advantage of your great biorhythm. However, always practice good judgement and money management when pursuing games of chance. Rating: 9";
      break;
    case "#+H":
      description =
        "Excellent day for success in business! This is what you've been waiting for!! Now's the time to go out and make it happen! You're in the midst of triple positives!! Rating: 9";
      break;
    case "#+#":
      description =
        "Excellent day for success in business and sports! This is what you've been waiting for!! Now's the time to go out and make it happen! You're in the midst of triple positives!! Rating: 8";
      break;
    case "#+C":
      description =
        "Be wary of the Caution intellectual - otherwise it should be a great day! Rating: 6";
      break;
    case "#+-":
      description =
        "Excellent day for success in business and sports! This is what you've been waiting for!! Now's the time to go out and make it happen! Rating: 7";
      break;
    case "#+*":
      description =
        "Opportunities abound with this biorhythm. Excellent bios for business. Rating: 7";
      break;
    case "#+L":
      description =
        "Be wary of the 'L' since it can impair your memory and decision-making abilities. Otherwise, it should be a great day! Rating: 5";
      break;

    case "#Hc":
      description =
        "Emotional peak days 'H' mean the potential for highly unusual luck. Rating:8";
      break;
    case "#H+":
      description =
        "BUSINESS: You have excellent potential for success in your business affairs. A great day to schedule important meetings! BUSINESS/PERSONAL: If you or your potential customer has these bios, your chances are enhanced to make the sale or close the deal. If you both have an emotional '+', '#', or 'H', all you need is a pen for signing papers and closing the deal. SPORTS: This should be a super day! You have the potential for highly unusual good luck, and your performance potential is heightened during this period for any and all of your sporting activities!! Rating: 10";
      break;
    case "#HH":
      description =
        "CONGRATULATIONS!! You have three positives today and you're at the peak in the Emotional and Intellectual cycles. With these bios, you have an excellent chance of winning at games of chance such as slot machines, blackjack, bingo, keno, craps, poker, or any other game of chance. Las Vegas, Reno, Lake Tahoe, Atlantic City, Monte Carlo will all be on their knees when you're through. Be sure to play smart. Business: If you don't close some huge deals today, you may as well retire! Seriously, this series of bios is very rare, so when you do get this kind of biorhythm, you need to really take advantage of the opportunity. Sports: Your competition doesn't stand a chance! You may even feel sorry for them after you defeat them without mercy. You can also top your career highs or personal best during this lunar phase. Rating: 10";
      break;
    case "#H#":
      description =
        "Excellent day for business. You have the potential to succeed in all of your business endeavors today! This is what you've been waiting for!! Now's the time to go out and make it happen! You're in the midst of triple pluses!! Why are you still sitting there?! Rating:9";
      break;
    case "#HC":
      description =
        "Be wary of the Intellectual cycle Caution. You should do well in attaining most all of your goals. This may be a very lucky day for you since you do have the potential to excel in sports and gaming activities with your Emotional cycle at its peak. Rating: 8";
      break;
    case "#H-":
      description =
        "A peak day emotionally is always a good thing, however, you do have a '-' in your Intellectual cycle, so think twice before taking action. Rating:7";
      break;
    case "#HL":
      description =
        "A peak day emotionally is always a good thing, however, you do have an 'L' in your Intellectual cycle, so think twice before taking action. You should be dealt some very good hands today. The problem may be what you do with those hands. Rating: 7";
      break;
    case "#H*":
      description =
        "I love peak days, and so should you! An 'H' in the Emotional cycle! You have the potential for lots of very good luck!! Rating: 9";
      break;
    case "##c":
      description =
        "This has better than average potential for your business. The '+' and '#' signs in the Emotional cycle are nearly equal. Rating:8";
      break;
    case "##+":
      description =
        "You have very good biorhythms today. You have excellent potential to achieve any of your goals. You should do quite well in your favorite sport. Rating:9";
      break;
    case "##H":
      description =
        "This is what you've been waiting for!! Now's the time to go out and make it happen! You're in the midst of triple positives!! Rating:9";
      break;
    case "###":
      description =
        "These are very good bios. You should take advantage of this kind of biorhythmic day. It's only slightly less effective than a triple positive. However, you should do quite well in all of your endeavors. Have a terrific day! Rating:9";
      break;
    case "##C":
      description =
        "A double positive like this one is good for most business, but watch out for the Intellectual cycle Caution as it may impair your judgment today. Rating: 7";
      break;
    case "##-":
      description =
        "The '-' in your Intellectual cycle may affect the outcome of those activities that require mental acuity. However, you'll do quite well in business if your decisions are sound. Rating: 7";
      break;
    case "##L":
      description =
        "The 'L' or low point in your Intellectual cycle may affect the outcome of those activities that require mental acuity. Rating:6";
      break;
    case "##*":
      description =
        "Good biorhythm for business if you can maintain a positive mental attitude. Have a great day! Rating: 8";
      break;
    case "#Cc":
      description =
        "Things may get a little intense today - best to back off a bit. Rating: 6";
      break;
    case "#C+":
      description =
        "This should be a great day if you remember not to take things too seriously or overreact. Avoid any confrontational situations today. Rating: 7";
      break;
    case "#CH":
      description =
        "Potential is good for business, but try to remain calm if you catch that lucky break! Rating: 7";
      break;
    case "#C#":
      description =
        "Potential is good for business, but try to remain calm if you catch that lucky break! Rating: 7";
      break;
    case "#CC":
      description =
        "This should be a great day if you remember not to take things too seriously or overreact. Avoid any confrontational situations today. Today it is especially important to realize that you also have an Intellectual cycle Caution, which may tend to aggravate an emotional situation since your judgment may be impaired. Rating: 5";
      break;
    case "#C-":
      description =
        "This should be a great day if you remember not to take things too seriously or overreact. Avoid any confrontational situations today. Today it is especially important to realize that you also have an Intellectual cycle '-', which may tend to aggravate an emotional situation since your judgment may be impaired. Rating: 3";
      break;
    case "#CL":
      description =
        "This should be a great day if you remember not to take things too seriously or overreact. Avoid any confrontational situations today. Today it is especially important to realize that you also have an Intellectual cycle low 'L', which may tend to aggravate an emotional situation since your judgment may be impaired. Be cautious in your business strategies today. Rating: 3";
      break;
    case "#C*":
      description =
        "Be wary of the Critical or Caution represented by the 'C' in your Emotional cycle, which may make you feel intense or you may tend to overreact to things today. It's important to know that you have this emotional bio today so you are better able to understand why you may take things more seriously than you normally would. Rating: 6";
      break;
    case "#-c":
      description =
        "The '-' in your Emotional cycle is symbolic of depleted energies and is not good for most activities in business, sports, or your personal life.Rating:4 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 7";
      break;
    case "#-+":
      description =
        "The Physical and Intellectual cycles are fine, but your Emotional cycle '-' may be the cause of some difficulties. These can sometimes be overcome with the right positive mental attitude.Rating:7 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 9";
      break;
    case "#-H":
      description =
        "Your Physical and Intellectual cycles are fine, however, you may find that today you're lacking your normal proactive approach to life that you normally possess. No need to be too concerned because in a few days you'll be back to your normal confident self.Rating:7 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 10";
      break;
    case "#-#":
      description =
        "The '-' in the Emotional cycle does not produce as much good luck as the '+', 'H', or '#'.Rating:6 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 8";
      break;
    case "#-C":
      description =
        "Physically you should have plenty of energy but emotionally you may feel drained. You have a Caution in your Intellectual cycle and a '-' in your Emotional cycle. The combination of these two create a scenario where you have depleted energies emotionally and impaired decision-making abilities. So, if you have an opportunity to postpone critical personal issues or business endeavors it would be prudent to do so. Rating:3  You have a possibility for unusual luck  if the lunar phase is a New Moon or Waxing Gibbous on this date Rating: 6";
      break;
    case "#--":
      description =
        "Physically you're OK but emotionally and intellectually it would be difficult to expect many positive outcomes in business. or sports activities today.Rating:-2 You have a possibility for unusual luck if if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 5";
      break;
    case "#-L":
      description =
        "You have an 'L' or mini-caution in your Intellectual cycle and a '-' in your Emotional cycle.  The combination of these two create a scenario where you have depleted energies emotionally and impaired decision-making abilities.  So, if you have an opportunity to postpone critical issues or business meetings it would be prudent to do so.Rating:-3 \"The single biggest problem in communication is the illusion that it has taken place.\" -George Bernard Shar You have a possibility for unusual luck if if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 4 ";
      break;
    case "#-*":
      description =
        "The Emotional cycle '-' will be the most influential factor in determining success in your chosen endeavors today. Unfortunately, your chances are lessened at this point of your biorhythm.  If you have a choice consider delaying critically important matters to when your chances are increased.  Your chances are increased when you have one of the symbols '+', '#', or 'H' in your Emotional cycle.Rating:0 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 5";
      break;
    case "#Lc":
      description =
        "The emotional 'L' has produced unusual luck but it is difficult to say whether it will be unusually good or unusually bad.Rating:5 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating: 8";
      break;
    case "#L+":
      description =
        "The mini-caution 'L' in the Emotional cycle is really not a negative.  Because of the change from negative to positive, there may be a surge of energy at this point that generates unusual luck.Rating:7 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating: 9";
      break;
    case "#LH":
      description =
        "The mini-caution 'L' in the emotional cycle is really not a negative.  Because of the changeover there may be a surge of energy at this point that generates unusual luck.Rating:8 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating: 10";
      break;
    case "#L#":
      description =
        "The mini-caution 'L' in the emotional cycle is really not a negative.  Because of the changeover there may be a surge of energy at this point that generates unusual luck.Rating:7 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating: 8";
      break;
    case "#LC":
      description =
        "The mini-caution 'L' in the Emotional cycle is really not a negative.  Because of the changeover there may be a surge of energy at this point that generates unusual luck. However, with a Caution on the Intellectual cycle it may be difficult to have positive outcomes occur today.Rating:4 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating: 6";
      break;
    case "#L-":
      description =
        "The '-' in your Intellectual cycle is not good for your decision-making ability.  The 'L' is not as predictable as the 'H' when it comes to luck. However, with the 'L' you do have potential for highly unusual luck.Rating:-2 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating: 5";
      break;
    case "#LL":
      description =
        "These bios may not be as bad as they look. You're emotionally and intellectually at the lowest point in those cycles but the emotional low has often yielded unusual luck. It's the Intellectual cycle 'L' that could give you some trouble with a reduction in memory and decision-making ability.Rating:-2 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating: 5 \"Obstacles are those frightful things yousee when you take your eyes off the goal.\"-Hannah More.";
      break;
    case "#L*":
      description =
        "The 'L' in your Emotional cycle may give you some unusual luck today.  Although usually it is a sign of depleted energies but on this particular day there may be an energy surge which scientific or metaphysical research doesn't fully understand.Rating:0 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date . Rating:7";
      break;
    case "#*c":
      description =
        "This appears to be an average day. Re-charging in your emotional cycle may make you feel somewhat lazy or lethargic, so you may want to kick back and relax today.Rating:7 You have a possibility for unusual luck if the lunar phase Waxing Crescent on this date. Rating: 8";
      break;
    case "#*+":
      description =
        "The recharging effect in the Emotional cycle may be overcome with a positive mental attitude.Rating:7 You have a possibility for unusual luck if the lunar phase Waxing Crescent on this date. Rating: 9";
      break;
    case "#*H":
      description =
        "Although you're recharging emotionally you can overcome the possible lackadaisical feelings that you may have today by 'psyching yourself up' to meet the challenge of the day.Rating:8 You have a possibility for unusual luck if the lunar phase Waxing Crescent on this date. Rating: 10";
      break;
    case "#*#":
      description =
        "You should be OK physically and intellectually. The '*' or recharging of your Emotional cycle may create a slight lackadaisical attitude that can be easily overcome with the right motivation.Rating:7 You have a possibility for unusual luck if the lunar phase Waxing Crescent on this date. Rating: 8";
      break;
    case "#*C":
      description =
        "You should have plenty of energy but you may be somewhat lackadaisical because you're recharging your energies emotionally. Be wary of your intellectual Caution.Rating:4 You have a possibility for unusual luck if the lunar phase Waxing Crescent on this date. Rating: 6";
      break;
    case "#*-":
      description =
        "You should have plenty of physical energy but you may be somewhat lackadaisical because you're recharging your energies emotionally. Be wary of your intellectual minus.Rating:-1 You have a possibility for unusual luck if the lunar phase Waxing Crescent on this date. Rating: 5";
      break;
    case "#*-":
      description =
        "The Intellectual cycle may create some difficulties so double-check your betting today or motivate yourself to concentrate more than you normally would. Rating: -1 You have a possibility for unusual luck if the lunar phase Waxing Crescent on this date. Rating: 5";
      break;
    case "#*L":
      description =
        "You should have plenty of energy but you may be somewhat lackadaisical because you're recharging your energies emotionally. Be wary of your Intellectual cycle low point 'L'. Possible impaired memory and judgmentRating:-1. You have a possibility for unusual luck if the lunar phase Waxing Crescent on this date. Rating:5";
      break;
    case "#**":
      description =
        "Physically you're fine but you're recharging in both Emotional and Intellectual cycles.Rating:5 You have a possibility for unusual luck if the lunar phase Waxing Crescent on this date. Rating: 8";
      break;
    case "Ccc":
      description =
        "Your Physical cycle caution can create problems such as tiredness and the increased likelihood of catching colds. Both your Emotional and Intellectual cycles are just heading upward and will be pluses tomorrow and this will give you double pluses for several days. Take advantage of double pluses whenever you have them since you can get great things accomplished. Rating: 5";
      break;
    case "Cc+":
      description =
        "Today and for several days as you head upward in your Emotional and Intellectual biorhythmic cycles you should have the confidence and luck to accomplish anything that you put your mind to. You do have a caution in the Physical cycle, which lowers your immunity to fend off colds, and you may get a bit more tired than usual but that should not deter you from reaching your goals. Rating: 6";
      break;
    case "CcH":
      description =
        "The Caution in the Physical cycle may make you feel more tired than normal. With the Intellectual cycle at its high point you may find that your creativity and mental faculties are quite sharp today. Rating: 6";
      break;
    case "Cc#":
      description =
        "The Caution in the Physical cycle may make you feel more tired than normal. With the Intellectual cycle at its high point you may find that your creativity and mental faculties are quite sharp today. Rating: 6";
      break;
    case "CcC":
      description =
        "You have Physical and Intellectual cycle Cautions today which can reduce your energy level in both cycles. The Physical cycle Caution can cause you to tire more easily than normal. The Intellectual cycle may affect your judgment. Together, these two affected cycles with a positive in the Emotional cycle has been construed by some researchers to be linked to accident proneness. You should try to be more cautious and not take undue risks today. Rating: 3";
      break;
    case "Cc-":
      description = "Not a good day for business activities. Rating: 4";
      break;
    case "CcL":
      description =
        "Possible 'off' day where you may not feel your normal self. Physical cycle Caution and a low point in your Intellectual cycle. Researchers tell us that this kind of biorhythm has potential for accident proneness so it would be prudent to be conservative and more cautious today.The only way some kids today learn traffic rules is by accident. - Anonymous Rating: 1";
      break;
    case "Cc*":
      description =
        "The Physical cycle Caution leaves you more susceptible to colds and allergies since your immune system is not as robust as in other phases of the Physical cycle. Rating: 5";
      break;
    case "C+c":
      description =
        "The Physical cycle Caution leaves you more susceptible to colds and allergies since your immune system is not as robust as in other phases of the Physical cycle. Rating: 6";
      break;
    case "C++":
      description =
        "Your potential for success is very good even with the Caution in the physical cycle. Rating:7";
      break;
    case "C+H":
      description =
        "You have very good potential for being dealt good hands. No reason you shouldn't go home a winner today! Rating: 8";
      break;
    case "C+#":
      description =
        "Business: Your potential for success is very good even with the Caution in the Physical cycle. Rating: 7";
      break;
    case "C+C":
      description =
        "BUSINESS/PERSONAL: You can overcome this combination of Mild accident-prone bios if you're alert and don't take any unnecessary chances. Rating:4";
      break;
    case "C+-":
      description =
        "Generally, being more cautious and less bold in your business strategies today may be the best bet. Rating: 3";
      break;
    case "C+L":
      description =
        "Generally, being more cautious and less bold in your business strategies today may be the best bet. Rating: 3";
      break;
    case "C+*":
      description =
        "Business: Good solid day to get it all done! If you're emotionally charged as you probably are with the '+' in the Emotional cycle, it should counteract the negative effect of the Caution in the Physical cycle. Rating: 5";
      break;
    case "CHc":
      description =
        "The peak day should do wonders for you and tomorrow you'll have a double-plus in the Emotional and Intellectual cycles which may be superb for business and sports . Rating: 6";
      break;
    case "CH+":
      description = "The peak day should do wonders for business! Rating: 8";
      break;
    case "CHH":
      description =
        "The emotional and intellectual double-high should yield some very positive results. You're at the peak emotionally so you have the potential to be very lucky today. You're at the peak on the Intellectual cycle as well so you should do very well in business and most all of your games of chance. Rating: 9";
      break;
    case "CH#":
      description =
        "Go for it!! The 'H' represents being at the peak in the emotional cycle. You may almost feel like Superman or Superwoman today!! Business and personal success should come easily for you today. Rating: 8";
      break;
    case "CHC":
      description =
        "This combination of biorhythm is a relatively rare occurrence. Physically and intellectually you may have some difficulties such as getting tired toward the end of the day or your ability to recall specific things is diminished. The Emotional cycle 'H' can give you a very positive feeling of well-being and even provide you with some good luck. With this combination of bios you may need to be a little cautious because of a potential for accident proneness. Rating: 5";
      break;
    case "CH-":
      description =
        "The 'H' is normally great but with the combination of a Caution physically and '-' intellectually it can be associated with mild accident proneness. Rating: 4";
      break;
    case "CHL":
      description =
        "Physically you have a Caution today. Intellectually you're at the low point, which can affect your memory and judgment. The only positive is that you're at the peak emotionally which can give you potential for highly unusual luck. Be cautious in your business decisions today as the low point intellectually can cause instances of poor judgment. Rating: 4";
      break;
    case "CH*":
      description =
        "A peak day is almost always welcome! Potential for extremely good luck today! Rating: 6";
      break;
    case "C#c":
      description =
        "Tired? The physical Caution can do this. Business should be fine. Rating: 6";
      break;
    case "C#+":
      description =
        "The positives in both the Emotional and Intellectual cycles will prove very helpful in attaining your business goals. Rating: 7";
      break;
    case "C#H":
      description =
        "Some biorhythm researchers believe that the combination of Emotional and Intellectual cycles governs wisdom. Rating:8";
      break;
    case "C##":
      description =
        "The positives in both the Emotional and Intellectual cycle will prove very helpful in attaining your business goals.Rating:8";
      break;
    case "C#C":
      description =
        "If you find you are dropping things or are a bit clumsier than normal it may be because of the combination of your bios today. Rating: 5";
      break;
    case "C#-":
      description =
        "A good day for being conservative and not take any additional risks. Rating: 4";
      break;
    case "C#L":
      description =
        "Possible 'off' day where you may not feel your normal self. Physical Caution and you're at the low point in your Intellectual cycle. Researchers tell us that this kind of biorhythm has potential for accident proneness so it may be wise to be more conservative and cautious today. \"The only way some kids today learn traffic rules is by accident.\" - Anonymous. Rating: 4";
      break;
    case "C#*":
      description =
        "Business: Better than average potential. A diplomatic salesman always remembers clients' birthdays but never their ages.Rating:6";
      break;
    case "CCc":
      description =
        "A double-caution day has the potential to throw you off so that you're not your normal self. You also may be more intense than you would like to be. Rating: 4";
      break;
    case "CC+":
      description = "Try to keep your emotions in check. Rating:6";
      break;
    case "CCH":
      description =
        "Thankfully, you have a positive in the Intellectual cycle, which will help you get through this day.  Try to keep your wits about you since you may feel intense and overreact today. Rating: 6";
      break;
    case "CC#":
      description =
        "Thankfully, you have a positive in the Intellectual cycle, which will help you get through this day.  Try to keep your wits about you since you may feel intense and overreact today. Rating: 6";
      break;
    case "CC-":
      description =
        "Try to have a nice day - it won't be easy, but it will get better in about a week. Rating: 3";
      break;
    case "CCC":
      description =
        'This would be a good day to tell yourself not to take things too seriously.  You may have a tendency to overreact to things today. Generally, things may not go the way you had intended and things may seem a little "off" to you. If possible, it may be best to just stay home and relax. Rating: 0';
      break;
    case "CCL":
      description =
        "With this series of bios you may find it truly frustrating.  Physically you may tire easily, emotionally you may over react or be more sensitive to issues than need be and intellectually there is a good likelihood that you'll forget things that you normally would remember.  Try not to take on important issues today. Rating: -1";
      break;
    case "CC*":
      description =
        "Your temper is one of your more valuable possessions.  Don't lose it. Anonymous Rating:4";
      break;
    case "C-c":
      description =
        "The Caution in your Physical cycle can make you feel more tired than normal toward the end of the day or when awakening in the morning. The '-' in your Emotional cycle is symbolic of depleted emotional energies and is not good for business or most activities in sports or your personal life.Rating:3 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating:7";
      break;
    case "C-+":
      description =
        "The '-' in your Emotional cycle is symbolic of depleted energies and is not good for business nor most activities in sports or your personal life.  The pluses in your Physical and Intellectual cycles may help to offset the negative impact of your depleted emotional energies.Rating:4 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date.Rating:7";
      break;
    case "C-H":
      description =
        "The '-' in your emotional cycle is symbolic of depleted energies and is not good for business nor most activities in sports or your personal life.  The pluses in your Physical and Intellectual cycles may help to offset the negative impact of your depleted emotional energies.Rating:4 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date.Rating:7";
      break;
    case "C-#":
      description =
        "The '-' in your emotional cycle is symbolic of depleted energies and is not good for business nor most activities in sports or your personal life. The positive in your Intellectual cycles may help to offset the negative impact of your depleted emotional energies.Rating:3 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 7";
      break;
    case "C-C":
      description =
        "Business may end up being a four letter word for you today.  If you have a chance you may want to take it easy and head for home.  Have someone cover for you.Rating:-2 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 5";
      break;
    case "C--":
      description =
        "Business may end up being a four letter word for you today.  If you have a chance you may want to take it easy and head for home.  Have someone cover for you.Rating:-2 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 5";
      break;
    case "C-L":
      description =
        "Very bad news for business. It doesn't get much worse than this. You're at the low point 'L' intellectually; you have a Caution physically and your energies are depleted emotionally. Can it get worse? Yes, but not very often.Rating:-3 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 5";
      break;
    case "C-*":
      description =
        "The Caution in your Physical cycle can make you feel more tired than normal toward the end of the day or when awakening in the morning. The '-' in your Emotional cycle is symbolic of depleted energies and is generally not good for business.Rating:0 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 5";
      break;
    case "CLc":
      description =
        "The 'L' is not always a negative factor but in combination with a Caution in the Physical cycle it can make you feel lackadaisical and even somewhat lazy because of the lack of energy that is available to you.Rating:5 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating: 7";
      break;
    case "CL+":
      description =
        "Fortunately you have a positive in the Intellectual cycle, which will help you to overcome any difficulties that the physical Caution or emotional 'L' might cause.Rating:5 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating: 9";
      break;
    case "CLH":
      description =
        "At least you're at the peak in the Intellectual cycle, which can help you to overcome the poor bios in the physical and emotional cycles.Rating:6 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating: 9";
      break;
    case "CL#":
      description =
        "The 'L' is not always a negative factor but in combination with a Caution in the Physical cycle it can make you feel lackadaisical and even somewhat lazy because of the lack of energy that is available to you.Rating:5 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating: 8";
      break;
    case "CLC":
      description =
        "Very difficult biorhythm today since all three cycles are in a Caution or mini-caution phase. It would be very difficult to obtain successful business outcomes today Rating:2. You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating: 6";
      break;
    case "CL-":
      description =
        "Think carefully before acting.Rating:-1 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating: 5";
      break;
    case "CLL":
      description =
        "Biorhythmically, it really doesn't get much worse than this. Your Emotional and Intellectual cycles are at the very bottom of their respective cycles so your energies will be depleted in both of them. If possible, it would be a good day to stay home and read a book or catch up on watching some good movies.Rating:-2 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating:4";
      break;
    case "CL*":
      description =
        "Below average bio day but you have a possibility for very unusual luck.Rating:5 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating: 7";
      break;
    case "C*c":
      description =
        "Things are starting to look up... and you have a possibility for unusual luck.Rating:6 You have a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date . Rating: 8";
      break;
    case "C*+":
      description =
        "Physical Cautions may make you susceptible to colds and allergies. Average hands to come today.Rating:5 You have a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating: 9";
      break;
    case "C*H":
      description =
        "At the peak intellectually!Rating:6 You have a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating: 10";
      break;
    case "C*#":
      description =
        "Tiring, and it's most likely a ho-hum kind of day. You have a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating: 8";
      break;
    case "C*C":
      description =
        "You may want to re-consider.... Rating:4 You have a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating: 7";
      break;
    case "C*-":
      description =
        "Take a careful second look...Rating:-1 You have a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating: 7";
      break;
    case "C*L":
      description =
        "Re-check your business strategies today.Rating:-1 You have a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating: 5";
      break;
    case "+":
      description =
        "This appears to be an average day of business. You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Business: 'Every man has a right to his opinion, but no man has a right to be wrong in his facts.' -Bernard Baruch  Rating:4 You have a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date Rating: 8";
      break;
    case "-cc":
      description =
        "Business: You're just breaking through and becoming pluses in both the Emotional and Intellectual cycles. Starting with the next day, and possibly today, you should find excellent potential for success in your business endeavors towards the end of the day. Rating: 6";
      break;
    case "-c+":
      description =
        "You'll soon have a double plus in both the Emotional and Intellectual cycles. Starting tomorrow you should find success in your business endeavors. Rating: 6";
      break;
    case "-cH":
      description =
        "You'll soon have a double plus in both the Emotional and Intellectual cycles. Starting tomorrow you should find success in your business activities. Rating: 7";
      break;
    case "-c#":
      description =
        "You'll soon have a double plus in both the Emotional and Intellectual cycles. Starting tomorrow you should find success in your business endeavors. Rating: 7";
      break;
    case "-cC":
      description =
        "The lower case 'c' represents the Emotional cycle flowing upward and crossing the line. Tomorrow you will have a plus in this cycle which begins a series of days where you should have an abundance of emotional energies which lead to confidence, a positive mental attitude and some luck. These are all ingredients for success. The only caveat here is that you have a Caution in your Intellectual cycle that may impair your decision-making abilities slightly. Rating: 3";
      break;
    case "-c-":
      description =
        " The lower case 'c' represents the Emotional cycle flowing upward and crossing the line.Tomorrow you will have a plus in the Emotional cycle which begins a series of days where you should have an abundance of emotional energies which lead to confidence, a positive mental attitude and some luck. The problem with this is that you have negatives in both the Physical and Intellectual cycles. Rating: 1";
      break;
    case "-cL":
      description =
        " The lower case 'c' represents the Emotional cycle flowing upward and crossing the line.\nTomorrow you will have a plus in the Emotional cycle which begins a series of days where you should have an abundance of emotional energies which lead to confidence, a positive mental attitude and some luck. These are all ingredients for success. The only caveat here is that you have an 'L' or low point in your Intellectual cycle that may impair your decision-making and memory. Rating: 0";
      break;
    case "-c*":
      description =
        "The lower case 'c' represents the emotional cycle flowing upward and crossing the line.  Tomorrow you will have a plus in this cycle which begins a series of days where you should have an abundance of emotional energies which lead to confidence, a positive mental attitude and some luck. Rating: 3";
      break;
    case "-+c":
      description =
        "Today and for several days you as you head upward in each of your biorhythmic cycles you should have lots of energy to do well in business. Rating: 6";
      break;
    case "-++":
      description =
        "Very good business can develop for you with these biorhythms. No reason you shouldn't go home a winner today. Rating: 8";
      break;
    case "-+H":
      description =
        "Very good business can develop for you with these biorhythms. No reason you shouldn't go home a winner today. Rating: 9";
      break;
    case "-+#":
      description =
        "Very good business can develop for you with these biorhythms. No reason you shouldn't go home a winner today. Rating: 8";
      break;
    case "-+C":
      description =
        "Good hands but what you do with them may be the key today. Rating: 5";
      break;
    case "-+-":
      description =
        "Good hands but what you do with them may be the key today. Rating: 5";
      break;
    case "-+L":
      description =
        "With the Intellectual cycle 'L' you may need to think very carefully before making any hasty decisions. Rating: 4";
      break;
    case "-+*":
      description =
        "Always look forward to having emotional pluses. Good things seem to happen. Rating: 6";
      break;
    case "-Hc":
      description =
        "Potential for highly unusual luck. The peak day should do wonders for you. Rating: 7";
      break;
    case "-H+":
      description =
        "Great day for business since the Emotional cycle high should yield some very positive results. Rating: 8";
      break;
    case "-HH":
      description =
        "The Emotional and Intellectual cycles double-high should yield some very positive results. You're at the peak emotionally so you have the potential to be very lucky today. You should take home the bacon today! Rating: 9";
      break;
    case "-H#":
      description =
        "The Emotional cycle high should yield some very positive results. You're at the peak emotionally so you have the potential to be very lucky today. Rating:9";
      break;
    case "-HC":
      description =
        "The Caution in your Intellectual cycle may create some decision-making difficulties for you but if you take extra time to give serious thought to important issues you should be fine. Rating:5";
      break;
    case "-H-":
      description =
        "Good business potential today. Physically and intellectually your energies are depleted but the highlight of the day is that you're at the peak of the Emotional cycle. This can be a very lucky day for you! Remember that this 'peak' day occurs at 28-day intervals from this date. Rating:4";
      break;
    case "-HL":
      description =
        "The eighth day of the Emotional cycle is represented by the 'H'. This occurs when your Emotional cycle is at the very top of its peak. You have the potential for good luck today. On the other side of the coin, you are at the very bottom intellectually - represented by the 'L' or low point of this cycle. At this point, your memory and judgment may be impaired. So what can happen is that you may have unusually good luck but you won't remember it! Rating:5";
      break;
    case "-H*":
      description =
        "Just another peak day emotionally! Over the years I have witnessed that extremely good luck does not occur each time you're at the peak 'H' but it can occur 50% to 75% of the time. This percentage increases when the 'H' occurs with positives in the physical and intellectual cycles. Rating:7";
      break;
    case "-#c":
      description = "Business should be better than average. Rating:6";
      break;
    case "-#+":
      description =
        "You have some very good potential in your business activities today. Rating:8";
      break;
    case "-#H":
      description =
        "Business: Better than an average day for potential to do well. The positives in both the emotional and intellectual cycles will see to that. Rating:8";
      break;
    case "-##":
      description =
        "The '#' symbol signifies the portion of the biorhythmic cycle that is above the line but is heading downward. Double positives in both the Emotional and Intellectual cycles are very effective for heightened performance potential in sports. Rating:8";
      break;
    case "-#C":
      description =
        "Take it easy today. You may find yourself a bit more clumsy and accident-prone today. The intellectual Caution may be a factor in the reduction of your mental acuity today.Rating:6";
      break;
    case "-#-":
      description =
        "Your Physical and Intellectual cycles are not as favorable as the emotional. You most likely will have a slightly better than average day with business but probably nothing to write home about.Rating:6";
      break;
    case "-#L":
      description =
        "You're recharging physically but you're emotionally positive which should help to overcome some of the effects of the negative in the Intellectual cycle. Try not to make too many critical business decisions today. You may want to re-consider... Rating:4";
      break;
    case "-#*":
      description =
        "Although you're recharging your energies in both the Physical and Intellectual cycles it's not likely that it will have a negative effect since your Emotional cycle positive may counteract it.Rating:5";
      break;
    case "-Cc":
      description =
        "It may prove important to reduce the intensity of your negative feelings today.Rating:4";
      break;
    case "-C+":
      description =
        "You have a '+' intellectually which will hopefully govern or help you to control your mood since you have an emotional Caution which often creates more intensity and may cause you to overreact.Rating:6";
      break;
    case "-CH":
      description =
        "You're at the peak intellectually which will hopefully govern or help you to control your mood since you have an emotional Caution, which often creates more intensity than you may want. Try to keep cool and a good poker face when you land that deal!Rating:6";
      break;
    case "-C#":
      description =
        "Physically your energies are depleted and you have an emotional Caution. Fortunately, you have a positive in the intellectual cycle, which should help you get through the day. Rating:6";
      break;
    case "-CC":
      description =
        "You may feel like you're on an emotional roller coaster today and the Intellectual cycle Caution won't help matters. Be sure to think carefully before taking action. Take an unbiased second look. Rating:3";
      break;
    case "-C-":
      description =
        "Don't take things too seriously today since you do have a Caution emotionally. The Intellectual cycle '-' is of no help in controlling how you feel today. Unless you can do good things with the good hands that you're dealt. Rating:2";
      break;
    case "-CL":
      description =
        "Business is not a good option today since you are at an intellectual low point. Your intensity may cause you to do things that you normally would not do. Rating:-2 ";
      break;
    case "-C*":
      description =
        "Physically tiring day and perhaps too intense emotionally. Rating:5";
      break;
    case "--c":
      description =
        "Physically and emotionally you have depleted energies (minuses) so it's difficult to expect positive outcomes with these bios. Intellectually, you will have a plus tomorrow so it's something to look forward to.Rating:1 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 5";
      break;
    case "--+":
      description =
        "Positive intellectually may help to overcome the negative in your Emotional cycle that determines the kinds of hands that you'll be dealt. For luck you really should have the positives in the Emotional cycle.Rating:2 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating:6";
      break;
    case "--H":
      description =
        "Positive intellectually may help to overcome the negative in your emotional cycle that determines the kinds of hands that you'll be dealt. For luck you really should have the positives in the Emotional cycle.Rating:3 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date.Rating:7";
      break;
    case "--#":
      description =
        "Positive intellectually may help to overcome the negative in your Emotional cycle that determines the kinds of hands that you'll be dealt. For luck you really should have the positives in the Emotional cycle.Rating:2 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date.Rating:7";
      break;
    case "--C":
      description =
        "Very poor biorhythm. Physically and emotionally your energies are depleted. Intellectually you have a Caution which may make things more difficult. Fortunately in a week or so things will start to feel much better. Rating:-1";
      break;
    case "---":
      description =
        "NOOOOOOOOO!! Extremely poor day to attempt any important business activities. If you don't mind having a bad day give it a try but don't return to your computer or phone and delete me if you find that I was right!Rating:-3 However, you have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date.Rating:4";
      break;
    case "--L":
      description =
        "Extremely poor day to attempt any important business endeavors. If you attempt any gaming or gambling and don't mind losing, give it a try but don't return to your computer or mobile phone and delete me if you lose your shirt!!Rating:-3 However, you have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous on this date.Rating:4";
      break;
    case "--*":
      description =
        "This can be a really rough day of business. A good day to just take it easy....Rating:-1 However, you have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous on this date.Rating:6";
      break;
    case "-Lc":
      description =
        "Physically your energies are depleted and emotionally you're at the very bottom of the cycle. The 'L' often is a positive factor since it represents the transition from the '--' to the '*' which changes from a negative heading downward to heading upward. This mini-caution can sometimes produce unusually lucky events.Rating:2 However, you have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating: 6";
      break;
    case "-L+":
      description =
        "The '+' on your Intellectual cycle will help with your creativity, memory and decision-making today. Golf may be have good possibilities.Rating:3 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating: 8";
      break;
    case "-LH":
      description =
        "The 'H' on your Intellectual cycle will help with your creativity, memory and decision-making today. Golf may have good possibilities today.Rating:7 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating:9";
      break;
    case "-L#":
      description =
        "The positive on your Intellectual cycle will help with your creativity, memory and decision-making today. Golf may have good possibilities today.Rating:3 Although you have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or waxing crescent on this date. Rating:7";
      break;
    case "-LC":
      description =
        "Business: Your chances today for success are next to nil - if not worse! Try again in a few days. Sports: There are no sports where you can do well with these bios. When compared to days when you have positives, you'll find that these bios will produce very poor results by comparison.Rating:0 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date . Rating:7";
      break;
    case "-L-":
      description =
        "Business: Your chances today for success are next to nil - if not worse! Try again in a few days.Rating:-2 However, you have the possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating:Rating:7";
      break;
    case "-LL":
      description =
        "Poker: When compared to days when you have pluses, you'll find that these bios will produce very poor results by comparison.Rating:-3 However, you have the possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating:7";
      break;
    case "-L*":
      description =
        "The 'L' represents the lowest point in your Emotional cycle. This can produce some good days but it's better to have a positive ('+','#' or 'H').Rating:1 However, you have the possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating: 7";
      break;
    case "-*c":
      description =
        "Depleted energy in the Physical cycle; recharging in the Emotional cycle and tomorrow will be a plus in the Intellectual cycle. Kind of a wait and see day...Rating:2 However, you have the possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating: 9";
      break;
    case "-*+":
      description =
        "Things are starting to shape up! However, you have the possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating: 5";
      break;
    case "-*H":
      description =
        "The '-' Physical cycle shows that your energies are depleted and the '*' in the Emotional cycle means that you're recharging. Appears to be an average day. Creativity is enhanced so it may be a good day for research and reading.Rating:5 However, you have the possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating: 9";
      break;
    case "-*#":
      description =
        "A good day for reading and study.Rating:4 However, you have the possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating:9";
      break;
    case "-*C":
      description =
        "A good day to take it easy and not tackle the difficult or critically important items .Rating:3 However, you have the possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating: 7";
      break;
    case "-*-":
      description =
        "Emotionally you're recharging but physically and intellectually you're heading downward so your chances of heightened performance are substantially reduced during this period. You may want to wait a week or two before tackling the tasks which you find difficult.Rating:-1 However, you have the possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating:7";
      break;
    case "-*L":
      description =
        "You're at the bottom of the Intellectual cycle which is likely to cause lapses in memory as well as errors in judgment or decision-making. Double check your work today.Rating:-1 However, you have the possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating:7";
      break;
    case "-**":
      description =
        "This appears to be a relatively average day with emotional and intellectual cycles recharging.Rating:3 However, you have the possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating:8";
      break;
    case "Lcc":
      description =
        "Business: You're just breaking through and becoming pluses in both the Emotional and Intellectual cycle. Starting with the next day, and possibly today, you should find excellent potential for success in your business endeavors. Rating:4";
      break;
    case "Lc+":
      description =
        "Business: You're just breaking through and becoming pluses in both the Emotional and Intellectual cycle. Starting with the next day, and possibly today, you should find excellent potential for business success. Rating: 6";
      break;
    case "LcH":
      description =
        "Business: You're just breaking through and becoming pluses in both the Emotional and Intellectual cycle. Starting with the next day, and possibly today, you should find excellent potential for business success. Rating: 7";
      break;
    case "Lc#":
      description =
        "Business: You're just breaking through and becoming pluses in both the Emotional and Intellectual cycle. Starting with the next day, and possibly today, you should find excellent potential for business success. Rating: 6";
      break;
    case "LcC":
      description =
        "This series of bios where you have cautions and mini-cautions in each of your phases can throw you off just a bit. If you were to compare today with other days where you have positives such as '+', '#' or 'H' in each of your phases you would find that performance is significantly less effective today than with the positives or the symbols that I've just described. Rating: 0";
      break;
    case "Lc-":
      description =
        "Physically and intellectually your chances of heightened performance are substantially reduced during this period. You may want to wait a week or two before tackling the tasks which you find difficult. Rating:0";
      break;
    case "LcL":
      description =
        "These bios can throw you off today so take it easy with your business tasks. It might even be a good day to take off from work! Rating:-1";
      break;
    case "Lc*":
      description =
        "Your physical energies are depleted today but at least tomorrow you will have an emotional plus which will be the start of several good days of positive things to occur. Rating:4";
      break;
    case "L+c":
      description =
        "Today and for several days as you head upward in each of your biorhythmic cycles you should have lots of energy to accomplish whatever you desire. Rating:5";
      break;
    case "L++":
      description =
        "Business success is nearly guaranteed although you may get awfully tired achieving it. Rating:8";
      break;
    case "L+H":
      description =
        "Business success is nearly guaranteed although you may get awfully tired achieving it. Rating:9";
      break;

    case "L+#":
      description =
        "Business success is nearly guaranteed although you may get awfully tired achieving it. Rating:8";
      break;
    case "L+C":
      description =
        "Hopefully the emotional '+' will help you to avoid the problems that the physical cycle 'L' and Intellectual cycle Caution can cause when combined on the same day. A good day to be conservative and not a risk taker. Rating: 4";
      break;
    case "L+-":
      description =
        "Hopefully the Emotional cycle '+' will help you to avoid the problems that the physical cycle 'L' and Intellectual cycle '-' can cause when combined on the same day. Rating:4";
      break;
    case "L+L":
      description =
        "Physically and intellectually you're in the dumps - although you'll probably feel fine being there! You may get a bit tired and your judgment and memory will most likely be impaired so try to remain alert as you drive and do other activities. Rating:2";
      break;
    case "L+*":
      description =
        "Always look forward to having emotional pluses. Good things seem to happen. The 'L' in your Physical cycle can have a detrimental effect in that it may tire you easily today. Rating:5";
      break;
    case "LHc":
      description =
        "The 'H' has the potential to give you exceptional luck. Rating: 7";
      break;
    case "LH+":
      description =
        "Business: Good solid day to get it all done! Peak day emotionally is great!! Full boat is a definite possibility! Rating: 9";
      break;
    case "LHH":
      description =
        "The Emotional and Intellectual cycle double-highs should yield some very positive results. You're at the peak emotionally so you have the potential to be very lucky today. You're at the peak on the intellectual cycle as well so you should do very well in your business endeavors. Rating:9";
      break;
    case "LH#":
      description =
        "Business: Good solid day to get it all done! Peak day emotionally is great!! Full boat is a definite possibility! Rating: 9";
      break;
    case "LHC":
      description =
        "With this series of Cautions and mini- cautions you may feel physically tired but your emotional high will pick you up and hopefully help you through the day. Rating: 5";
      break;
    case "LH-":
      description =
        "Be cautious and don't take any unnecessary chances. You should be dealt some decent hands today. Rating:5";
      break;
    case "LHL":
      description =
        "This has the potential to be a highly lucky day for you with the 'H' in your emotional cycle. Caveat: Low point in the intellectual cycle - judgment and memory may be impaired - more so today than other days in the Intellectual cycle. Your physical energies are very depleted so it will be interesting to see if your peak emotional cycle can pick you up physically. Rating: 4";
      break;
    case "LH*":
      description =
        "You're at the bottom of the cycle physically and at the peak emotionally. The peak day emotionally should overshadow the physical low point that you're in today. Rating:5";
      break;
    case "L#c":
      description =
        "Today and for several days as you head upward in each of your biorhythmic cycles you should have lots of energy to accomplish whatever you desire. Rating:5";
      break;
    case "L#+":
      description =
        "The positives in both the Emotional and Intellectual cycles will prove very helpful in attaining your goals. Rating:7";
      break;
    case "L#H":
      description =
        "The positives in both the Emotional and Intellectual cycles will prove very helpful in attaining your goals. Rating:8";
      break;
    case "L##":
      description =
        "Physically your energies will be very low but the Emotional and Intellectual cycle positives will make it a good business day. Rating:8";
      break;
    case "L#C":
      description =
        "Take it easy today. You may find yourself a bit more clumsy and accident-prone today. Rating:5";
      break;
    case "L#-":
      description =
        "Business should be better than average. Physically tiring today. If you're called clumsy today - you'll know the reason why. Rating:4";
      break;
    case "L#L":
      description =
        "Business should be better than average. Physically tiring today. If you're called clumsy today - you'll know the reason why. Rating:3";
      break;
    case "L#*":
      description =
        "Feelin' tired today? At least the emotional positive can help you get through the day. Rating:5";
      break;
    case "LCc":
      description =
        "Physically you may feel tired but your emotional intensity may override any tired feelings you may encounter. It may prove more important to reduce your intensity or your negative feelings of anger today. Rating: 4";
      break;
    case "LC+":
      description =
        "Physical energy is bottomed-out today but your emotional intensity may override any tiredness. The positive in your intellectual cycle should help in this situation. Rating: 6";
      break;
    case "LCH":
      description =
        "Physical energy is bottomed-out today but your emotional intensity may override any tiredness. The positive in your intellectual cycle should help in this situation. Rating: 7";
      break;
    case "LC#":
      description =
        "Physical energy is bottomed-out today but your emotional intensity may override any tiredness. The positive in your intellectual cycle should help in this situation. Rating: 6";
      break;
    case "LCC":
      description =
        "A negative series of biorhythmic cycles since in this combination they can create difficulties for you - not severe - but noticeable. Biorhythmic symptoms: Tired, too intense, poor judgment. Rating: 3";
      break;
    case "LC-":
      description =
        "A negative series of biorhythmic cycles since in this combination they can create difficulties for you - not severe - but noticeable. Biorhythmic symptoms: Tired, too intense, poor judgment. Rating: 2";
      break;
    case "LCL":
      description =
        "It may not get much worse than this from the standpoint of biorhythms. Try not to take things too seriously today and be careful since some biorhythm researchers say this combination of bios can lead to accident-proneness. Rating: -1";
      break;
    case "LC*":
      description =
        "Physically tiring day and perhaps too intense emotionally today. Rating: 4";
      break;
    case "L-c":
      description =
        'The minus in the Emotional cycle means your energies are quickly becoming depleted.  So in combination with the physical "L" or low point this can be a very tiring day. Rating:0';
      break;
    case "L-+":
      description =
        "The minus in the Emotional cycle means your energies are quickly becoming depleted.  So in combination with the physical 'L' or low in the Physical cycle this can be a very tiring day.Rating:2 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating:6";
      break;
    case "L-H":
      description =
        "The '-' in the Emotional cycle means your energies are quickly becoming depleted.  So in combination with the physical 'L' or low in the Physical cycle,this can be a very tiring day. Fortunately you have a peak day in the Intellectual cycle so you should be thinking sharply.Rating:3 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating:7";
      break;
    case "L-#":
      description =
        "The '-' in the Emotional cycle means your energies are quickly becoming depleted.  So in combination with the Physical cycle \"L\" or low point this can be a very tiring day. Fortunately you have a positive day in the Intellectual cycle so you should be thinking sharply.Rating:2 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating:8";
      break;
    case "L-C":
      description =
        "You may not get the deals or sales that you would like today. Not particularly pleasant bios today.  The '-' in the Emotional cycle means your energies are quickly becoming depleted.  In combination with the Physical cycle 'L' or low point, this can be a very tiring day. In addition, you have a Caution intellectually so decision-making may be affected.Rating:-3 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating:7";
      break;
    case "L--":
      description =
        "All three cycles have depleted energies. These bios are not good for achieving success in business, sports, gaming or gambling. Check into the future with this program to determine when the double minuses '--' in the Emotional and Intellectual cycles are gone and become positive.Rating:-3 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating:7";
      break;
    case "L-L":
      description =
        "Whoa!! This looks really lousy for business, Sports and games of chance.  Best to go home and take it easy. Extremely poor biorhythm with the Physical and Intellectual cycles at their lowest point and your Emotional cycle is a '-'.  It would be very difficult to expect successful outcomes today based on this combination of bios. The only positive aspect of these bios is that they won't last long since biorhythms are based upon cycles so the positives will soon be with you.  Rest assured that this is only a temporary phase.Rating:-3 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating:7";
      break;
    case "L-*":
      description =
        "The '-' Emotional cycle is not a good thing for business and with a low point physically you may be a bit off in your favorite sports.Rating:-3 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating: 7";
      break;
    case "LLc":
      description =
        "You may find that you tire easily today and the 'L' Emotional cycle will simply accentuate the feelings you may have about your lack of energy. You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating: 1";
      break;
    case "LL+":
      description =
        "It may be difficult to expect good business results today. The Intellectual cycle positive is helpful but may not be enough to overcome the mini-cautions on the Physical and Emotional cycles. There are very few sports where you can do well with these bios. Golf and possibly bowling may be the exception today.Rating:3 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating:9";
      break;
    case "LLH":
      description =
        "It may be difficult to expect good business results today. The Intellectual cycle positive is helpful but may not be enough to overcome the mini-cautions on the Physical and Emotional cycles.Rating:4 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating:8";
      break;
    case "LL#":
      description =
        "Possibility for some good hands but not as good as when you have a positive in the Emotional cycle.Rating:3 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating:7";
      break;
    case "LLC":
      description =
        "With this combination of biorhythmic cycles it would be very difficult to expect any positive outcomes. You're at the very bottom of the cycle in both your Physical and Emotional cycles and heading downward in the Intellectual cycle.Rating:-2 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating:7";
      break;
    case "LL-":
      description =
        "Possibility for a good day but not as good as when you have a positive in the Emotional cycle.Rating:-2 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating:7";
      break;
    case "LLL":
      description =
        "How low can you go?! This combination of biorhythm is rare. You're at the very bottom of each of your three cycles. This would be a good day to stay home and read a book or just relax and enjoy being home. There's a certain comfort in this and with this series of bios you'll probably need it. Today is not the day to go out and try to set the world on fire. However, since you're bottomed-out on each cycle the good news is that your cycles will begin to head upward tomorrow. Today is a good day to get as much TLC as possible.Rating:-3 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating:7";
      break;
    case "LL*":
      description =
        "Possibility for a good day but not as good as when you have a positive in the Emotional cycle.Rating:2 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating:7";
      break;
    case "L*c":
      description =
        "Physically tiring day. Recharging emotionally and the Intellectual cycle will be positive tomorrow.Rating:3 You have the possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating:8";
      break;
    case "L*+":
      description =
        "Your Intellectual cycle '+' will help you through this tiring day.Rating:4 You have the possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating:8";
      break;
    case "L*H":
      description =
        "Your Intellectual cycle 'H' will be of value as you make it through your physically tiring day. You are at the low point 'L' of the Physical cycle.Rating:6 You have the possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating:9";
      break;
    case "L*#":
      description =
        "Your Intellectual cycle positive will help you through this tiring day.Rating:5 You have the possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating:9";
      break;
    case "L*C":
      description =
        "You may find yourself physically tired which may accentuate any errors in judgment caused by your intellectual Caution.Rating:3 You have the possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating:7";
      break;
    case "L*-":
      description =
        "The 'L' or low point in your Physical cycle may make you feel quite tired today and your Emotional and Intellectual cycles are of no help to counter the effects of the 'L' since your energies are depleted in those two cycles as well.Rating:-1 You have the possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating:7";
      break;
    case "L*L":
      description =
        "You're at the bottom of the Intellectual cycle which is likely to cause lapses in memory as well as errors in judgment or decision-making. You may want to double-check your work today.Rating:-1 You have the possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating:6";
      break;
    case "L**":
      description =
        "At least your Emotional and Intellectual cycles will be positive in a few days which will lead to some great potential for you. The Physical cycle 'L' will tire you but you have much to look forward to.Rating:4 You have the possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating:8";
      break;
    case "*cc":
      description =
        "Business: You're just breaking through and becoming pluses in both the Emotional and Intellectual cycles. Starting tomorrow, and possibly today, you should find excellent potential for success in your business. Rating:5 ";
      break;
    case "*c+":
      description =
        "Business: You're just breaking through and becoming pluses in both the Emotional and Intellectual cycles. Starting tomorrow, and possibly today, you should find excellent potential for success in your business. Rating:5";
      break;
    case "*cH":
      description =
        "You're at your peak intellectually so you should be thinking very sharply and 'on your toes'.Rating:7 ";
      break;
    case "*c#":
      description =
        "The lower case 'c' in your Emotional cycle represents a prelude to good things. Rating:6";
      break;
    case "*cC":
      description =
        "The lower case 'c' represents the Emotional cycle flowing upward and crossing the biorhythmic line of the sine wave. Tomorrow you will have a plus in this cycle which begins a series of days where you should have an abundance of emotional energies which leads to confidence, a positive mental attitude, and some luck. These are all ingredients for success. The only caveat here is that you have a Caution in your Intellectual cycle that may impair your decision-making abilities. Rating:2";
      break;
    case "*c-":
      description =
        "The lower case 'c' represents the Emotional cycle flowing upward and crossing the biorhythmic line of the sine wave. Tomorrow you will have a plus in this cycle which begins a series of days where you should have an abundance of emotional energies which leads to confidence, a positive mental attitude, and some luck. These are all ingredients for success. The only caveat here is that you have a '-' in your Intellectual cycle that may impair your decision-making abilities slightly. Rating:2";
      break;
    case "*cL":
      description =
        "The lower case 'c' represents the Emotional cycle flowing upward and crossing the biorhythmic line of the sine wave. Tomorrow you will have a plus in this cycle which begins a series of days where you should have an abundance of emotional energies which leads to confidence, a positive mental attitude, and some luck. The only caveat here is that you have an 'L' in your Intellectual cycle that may impair your decision-making abilities. Rating:1";
      break;
    case "*c*":
      description =
        "The lower case 'c' in your emotional cycle represents a prelude to good things. Rating:6";
      break;
    case "*+c":
      description =
        "The '+' in the Emotional cycle is an indicator of positive things that are likely to occur. The '+' in this cycle begins a series of days where you should have an abundance of emotional energies which leads to confidence, a positive mental attitude, and some good luck. These are all ingredients for success. Rating:7";
      break;
    case "*++":
      description =
        "These are excellent bios for business. Physically you're recharging but emotionally and intellectually you're a plus and heading upward. You should do quite well in most all of your activities today. Rating:9";
      break;
    case "*+H":
      description =
        "The Emotional cycle '+' is an indicator of good business potential. The plus in this cycle begins a series of days where you should have an abundance of emotional energies which leads to confidence, a positive mental attitude, and some good luck. These are all ingredients for success. Rating:9";
      break;
    case "*+#":
      description =
        "The Emotional cycle '+' is an indicator of good business potential. The plus in this cycle begins a series of days where you should have an abundance of emotional energies which leads to confidence, a positive mental attitude, and some good luck. These are all ingredients for success. Rating:9";
      break;
    case "*+C":
      description =
        "The Emotional cycle '+' is an indicator of good business potential. The plus in this cycle begins a series of days where you should have an abundance of emotional energies which leads to confidence, a positive mental attitude, and some good luck. Caveat: The Caution in your intellectual cycle may give you some problems with judgment and memory. Rating:6";
      break;
    case "*+-":
      description =
        "The Emotional cycle '+' is an indicator of good business potential.  The plus in this cycle begins a series of days where you should have an abundance of emotional energies which leads to confidence, a positive mental attitude and some good luck.  These are all ingredients for success.  Caveat: The minus in your intellectual cycle may give you some problems with judgment and memory. Rating: 5";
      break;
    case "*+L":
      description =
        "The 'L' in your Intellectual cycle may impair your mental capacities such as memory and judgment. Rating:3";
      break;
    case "*+*":
      description =
        "Although you are recharging your energies in both the Physical and Intellectual cycles, it's not likely that it will have any negative effect since your Emotional cycle '+' should counteract it. Rating:6";
      break;
    case "*Hc":
      description =
        "You have a peak day 'H' in your emotional cycle, which usually leads to very good outcomes in business and good luck as well. Rating:8";
      break;
    case "*H+":
      description =
        "Great potential for business and personal success. Great bios for sports such as golf, bowling, archery, fishing, and any other sport where confidence, concentration, and luck are key factors to success. Rating:9";
      break;
    case "*HH":
      description =
        "You have a double-high today in the Emotional and Intellectual cycles. Great bios for business, sports, gaming, and gambling of all kinds! Rating:10";
      break;
    case "*H#":
      description =
        "Great bios for business, sports, gaming, and gambling! Go out and make it happen!! You may get hands from straights to straight flushes today!! Rating:9";
      break;
    case "*HC":
      description =
        "You have the potential to be very lucky today but be careful with your decision-making as it may be somewhat impaired with the caution on the Intellectual cycle. Rating:7";
      break;
    case "*H-":
      description =
        "Business: Physically and intellectually your energies are depleted but the highlight of the day is that you're at the peak of the Emotional cycle. This can be a very lucky day for you! Remember that this 'peak' day occurs at 28-day intervals from this date.Rating:5";
      break;
    case "*HL":
      description =
        "You have the possibility for a very lucky day on this date! You should, however, be wary of your judgment since you're at the very bottom of the Intellectual cycle. Having the 'L' on the Intellectual cycle affects memory, judgment, and decision-making. A potential poker scenario could be that you catch great hands but have problems turning them into winning hands because your judgment or poker decisions may not be good. Rating:5";
      break;
    case "*H*":
      description =
        "Another potentially lucky day! The 'H' represents your peak day on the Emotional cycle. Think of ways to take advantage of this kind of lucky day. Rating:7";
      break;
    case "*#c":
      description =
        "The '#' symbol represents a positive that's almost as good as the '+' symbol - please see the biorhythm chart. Usually, positive things occur during this phase of the Emotional cycle. Rating:8";
      break;
    case "*#+":
      description =
        "The '#' symbol represents a positive that's almost as good as the '+' symbol - please see the biorhythm chart. Usually, positive things occur during this phase of the Emotional cycle. With a double positive in the Emotional and Intellectual cycles, you have some very good business potential. Rating:8";
      break;
    case "*#H":
      description = "Go for it! Your bios are solid! Rating:9";
      break;
    case "*##":
      description =
        "This combination of bios should give you ample opportunity for business success.Rating:8";
      break;
    case "*#C":
      description =
        "The Intellectual cycle Caution may be a factor in the reduction of your mental acuity today. Rating:6";
      break;
    case "*#-":
      description =
        "You're recharging physically but you're emotionally positive which should help to overcome some of the effects of the negative in the Intellectual cycle. You may wish to wait for a positive in the Intellectual cycle before attempting any important meetings. Rating:6 ";
      break;
    case "*#L":
      description =
        "You're recharging physically but you're emotionally positive which should help to overcome some of the effects of the negative in the Intellectual cycle. You may want to wait for a positive in the intellectual cycle before attempting to work on important business activities today. Rating:5";
      break;
    case "*#*":
      description =
        "Although you are recharging your energies in both the Physical and Intellectual cycles, it's not likely that it will have any negative effect since your Emotional '+' should counteract it. Rating:6";
      break;
    case "*Cc":
      description =
        "It may prove important to reduce your intensity or your negative feelings today. Rating:5 ";
      break;
    case "*C+":
      description =
        "It may prove important to reduce your intensity and place your negative feelings in check today. Rating:7";
      break;
    case "*CH":
      description =
        "You're at the peak intellectually which will hopefully govern or help you to control your mood since you have an emotional Caution, which often creates more intensity than is desirable. Rating:7";
      break;
    case "*C#":
      description =
        "It may prove important to reduce your intensity or your negative feelings today. Your emotional sensitivity may be acute today so try to remember to relax when you're confronted with critical business decisions. Don't let them get the best of you. Rating:7";
      break;
    case "*CC":
      description =
        "You may feel like you're on an emotional roller coaster today and the Intellectual cycle Caution won't help matters. Be sure to think carefully before taking action. Rating:2 ";
      break;
    case "*C-":
      description =
        "Don't take things too seriously today. Be wary of your decisions today. Rating:0";
      break;
    case "*CL":
      description =
        "Poor combination of biorhythms for business. Your intensity may make you take chances that you normally wouldn't if you had a positive in your Intellectual cycle. With a 'L' or low point in your judgment and memory you stand to lose a good deal of money. Your best bet is to wait for the positives—especially in the emotional and intellectual cycles. Rating:-1";
      break;

    case "*C*":
      description =
        "Try not to take things too seriously today. Soon your Physical and Intellectual cycles will become positive, which will help in lifting the overall effects of biorhythms in a positive way. Rating:4";
      break;
    case "*-c":
      description =
        "The '-' in your Emotional cycle means that you're not as likely to catch the good hands that you normally get when you have a '+','#' or 'H' in this cycle.Rating:0 Positives are on their way! You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous on this date. Rating:7";
      break;
    case "*-+":
      description =
        "Do things where you can take advantage of your judgment and creativity today. Emotionally you may be a little down because your energies are becoming depleted in this cycle.Rating:2 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating:8";
      break;
    case "*-H":
      description =
        "The hands you're dealt may not come as well as you would like today. Intellectually you are at your peak but your emotional cycle may prevent you from having the positive outcomes that you desire.Rating:3 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous on this date. Rating:10";
      break;
    case "*-#":
      description =
        "Don't let the lack of emotional energies get you down. You may overcome this stage of depleted energies by telling yourself this will be a good day!Rating:3 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating:9";
      break;
    case "*-C":
      description =
        "Double-check your business strategies today. Winning business: When you do the right things, right things happen. Be cautious in your decisions. Luck may be elusive today.Rating:-2 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating:7";
      break;
    case "*--":
      description =
        "Very poor business potential today. A good day to relax or if you have to go to work try not to tackle anything too important. Save those important items for when you have positives in your biorhythm. If it can't wait you may find that this is not your most productive period.Rating:-2 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating:7";
      break;
    case "*-L":
      description =
        "This is about as bad as it gets in terms of biorhythms. Your judgment and memory will most likely be impaired today. What was that phone number? What was that name? You just can't seem to remember? Don't worry, tomorrow things will start to improve. Difficult business dealings today which may prove to be very costly. Better to lay low.Rating:-2 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating:6";
      break;
    case "*-*":
      description =
        "Such a blah day. Your emotional energies really need help at this point! Best bet: Wait for the positives that will soon be with you.Rating:0 You have a possibility for unusual luck if the lunar phase is a New Moon or Waxing Gibbous on this date. Rating:7";
      break;
    case "*Lc":
      description =
        "Things can only get better from here—and they will!Rating:3 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous, or Waxing Crescent on this date. Rating:9";
      break;
    case "*L+":
      description =
        "Good business potential. The 'L' or 22nd day of the emotional cycle has produced some lucky outcomes but not as many as the 'H' or peak day—the 8th day of the Emotional cycle.Rating:4 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous, or Waxing Crescent on this date. Rating: 9";
      break;
    case "*LH":
      description =
        "Business: Your judgment and decision-making will be sharp but you may not have the self-confidence and positive outlook that is required for success. You may need to 'psych' yourself up at critical times.Rating:6 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous, or Waxing Crescent on this date. Rating: 10";
      break;
    case "*L#":
      description =
        "Business: Your judgment and decision-making will be sharp but you may not have the self-confidence and positive outlook that is required for success. You may need to 'psych' yourself up on these days.Rating:4 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous, or Waxing Crescent on this date. Rating:10 ";
      break;
    case "*LC":
      description =
        "Business: Positive outcomes - not likely today. Wait for the positives!Rating:1 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous, or Waxing Crescent on this date. Rating: 8";
      break;
    case "*L-":
      description =
        "Business: Positive outcomes - not likely. Wait for the positives! Rating:-2 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous, or Waxing Crescent on this date. Rating: 8";
      break;
    case "*LL":
      description =
        "How low can you go?! You're at the bottom in both the Emotional and Intellectual cycles. Your judgment may be severely impaired today. Be wary of your judgment in your business strategies today.Rating:-2 You have a possibility for unusual luck if the lunar phase is a New Moon, Waxing Gibbous, or Waxing Crescent on this date. Rating:8";
      break;
    case "*L*":
      description =
        "Although you need recharging in both the Physical and Intellectual cycles you may find that you have some unusually lucky event take place today.  I've recorded numerous highly unusual lucky events for many people over the years that have taken place with the mini-caution 'L' or the 22nd day of the Emotional cycle. I find that for most people the 8th day of the Emotional cycle has a higher probability of having a lucky event occur. Rating: 3 You have a possibility for unusual luck if if the lunar phase is a New Moon, Waxing Gibbous or Waxing Crescent on this date. Rating: 8";
      break;
    case "**c":
      description =
        "Recharging your energies today. Average potential. Rating:5 You have a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating:8";
      break;
    case "**+":
      description =
        "Your business creativity is enhanced during this period and you should be sharp mentally.Rating:6 You have a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating:9";
      break;
    case "**H":
      description =
        "You're re-charging physically and emotionally. Creativity is enhanced during this period and you should be sharp mentally.Rating:6 You have a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating:10";
      break;
    case "**#":
      description =
        "Slightly better than an average day since you have a positive in the intellectual cycle which will help you make sound business decisions. Rating: 5 You have a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating: 7";
      break;
    case "**C":
      description =
        "Physically and emotionally you're recharging but you have an intellectual caution, which may affect your ability to concentrate, and your judgment may be impaired today. Rating: 3 You have a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating: 7";
      break;
    case "**-":
      description =
        "You are recharging physically and emotionally and heading downward in the intellectual cycle.  A good day to take it easy.  Try to have a nice day. Rating: -1 You have a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating: 7";
      break;
    case "**L":
      description =
        "The intellectual cycle may cause some difficulties today. Your memory or judgment may be significantly impaired so be wary of potential errors in your business strategies today. YouThe intellectual cycle may cause some difficulties today.  Your memory or judgment may be significantly impaired so be wary of potential errors in your business strategies today. Rating: 0 You have a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating: 7 have a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating:0";
      break;
    case "***":
      description =
        "This combination of bios are essentially very average.  Biorhythm experts call this period a recharging phase.  In other words, your body, mind, and emotional energies require recharging - similar to batteries that are depleted of their energy and must be re-charged. This makes for an average day of business. Rating: 5 You have a possibility for unusual luck if the lunar phase is a Waxing Crescent on this date. Rating: 8";
      break;
    default:
      description = "Normal day";
      break;
  }
  return description;
};

export default calculateBiorhythm;
