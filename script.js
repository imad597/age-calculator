'use strict';

// ================= SET MAX DATE =================
document.addEventListener("DOMContentLoaded", () => {
  const dobInput = document.getElementById('dob');
  const targetInput = document.getElementById('target-date');
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  dobInput.max = todayStr;
  targetInput.max = todayStr;
});

// ================= HELPER FUNCTIONS =================

// Calculate precise age as of a given date
function calculatePreciseAge(dob, referenceDate=null) {
  const birthDate = new Date(dob);
  const now = referenceDate ? new Date(referenceDate) : new Date();
  if(birthDate > now) return null;

  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();

  if(days < 0) {
    months -= 1;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if(months < 0) {
    years -= 1;
    months += 12;
  }

  const totalMs = now - birthDate;
  const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));
  const totalHours = Math.floor(totalMs / (1000 * 60 * 60));
  const totalMinutes = Math.floor(totalMs / (1000 * 60));
  const totalSeconds = Math.floor(totalMs / 1000);

  return { years, months, days, totalDays, totalHours, totalMinutes, totalSeconds, referenceDate: now };
}

// Zodiac Sign
function getZodiac(month, day) {
  const signs = ["Capricorn","Aquarius","Pisces","Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius"];
  const lastDay = [19,18,20,19,20,20,22,22,22,22,21,21];
  return day <= lastDay[month] ? signs[month] : signs[(month+1)%12];
}

// Personal Character
function getPersonalCharacter(zodiac) {
  const traits = {
    "Aries": "Bold, energetic, and passionate.",
    "Taurus": "Reliable, patient, and devoted.",
    "Gemini": "Adaptable, curious, and communicative.",
    "Cancer": "Emotional, intuitive, and caring.",
    "Leo": "Confident, generous, and charismatic.",
    "Virgo": "Analytical, practical, and meticulous.",
    "Libra": "Diplomatic, charming, and fair-minded.",
    "Scorpio": "Intense, brave, and resourceful.",
    "Sagittarius": "Optimistic, adventurous, and independent.",
    "Capricorn": "Disciplined, responsible, and wise.",
    "Aquarius": "Innovative, humanitarian, and original.",
    "Pisces": "Compassionate, artistic, and intuitive."
  };
  return traits[zodiac] || "Unique and mysterious personality!";
}

// Birthstone Names
function getBirthstone(month) {
  const stones = ["Garnet","Amethyst","Aquamarine","Diamond","Emerald","Pearl","Ruby","Peridot","Sapphire","Opal","Topaz","Turquoise"];
  return stones[month];
}

// ================= DYNAMIC SVG ICONS =================
const zodiacSVGs = {
  "Aries": '<svg width="40" height="40" viewBox="0 0 24 24" fill="#FF4500"><circle cx="12" cy="12" r="10"/></svg>',
  "Taurus": '<svg width="40" height="40" viewBox="0 0 24 24" fill="#228B22"><rect x="4" y="4" width="16" height="16"/></svg>',
  "Gemini": '<svg width="40" height="40" viewBox="0 0 24 24" fill="#1E90FF"><polygon points="12,2 22,22 2,22"/></svg>',
  "Cancer": '<svg width="40" height="40" viewBox="0 0 24 24" fill="#FF69B4"><path d="M12 2C17 2 22 7 22 12C22 17 17 22 12 22C7 22 2 17 2 12C2 7 7 2 12 2Z"/></svg>',
  "Leo": '<svg width="40" height="40" viewBox="0 0 24 24" fill="#FFD700"><circle cx="12" cy="12" r="8"/></svg>',
  "Virgo": '<svg width="40" height="40" viewBox="0 0 24 24" fill="#8A2BE2"><rect x="6" y="6" width="12" height="12"/></svg>',
  "Libra": '<svg width="40" height="40" viewBox="0 0 24 24" fill="#00CED1"><ellipse cx="12" cy="12" rx="10" ry="6"/></svg>',
  "Scorpio": '<svg width="40" height="40" viewBox="0 0 24 24" fill="#FF6347"><path d="M2 12h20v2H2z"/></svg>',
  "Sagittarius": '<svg width="40" height="40" viewBox="0 0 24 24" fill="#FF8C00"><polygon points="2,2 22,12 2,22"/></svg>',
  "Capricorn": '<svg width="40" height="40" viewBox="0 0 24 24" fill="#A0522D"><path d="M12 2L22 12H2Z"/></svg>',
  "Aquarius": '<svg width="40" height="40" viewBox="0 0 24 24" fill="#00BFFF"><path d="M2 6h20v2H2zM2 14h20v2H2z"/></svg>',
  "Pisces": '<svg width="40" height="40" viewBox="0 0 24 24" fill="#1E90FF"><ellipse cx="12" cy="12" rx="10" ry="5"/></svg>'
};

const birthstoneSVGs = {
  "Garnet": '<svg width="30" height="30" fill="#8B0000"><circle cx="15" cy="15" r="12"/></svg>',
  "Amethyst": '<svg width="30" height="30" fill="#800080"><circle cx="15" cy="15" r="12"/></svg>',
  "Aquamarine": '<svg width="30" height="30" fill="#7FFFD4"><circle cx="15" cy="15" r="12"/></svg>',
  "Diamond": '<svg width="30" height="30" fill="#B9F2FF"><circle cx="15" cy="15" r="12"/></svg>',
  "Emerald": '<svg width="30" height="30" fill="#50C878"><circle cx="15" cy="15" r="12"/></svg>',
  "Pearl": '<svg width="30" height="30" fill="#EAE0C8"><circle cx="15" cy="15" r="12"/></svg>',
  "Ruby": '<svg width="30" height="30" fill="#E0115F"><circle cx="15" cy="15" r="12"/></svg>',
  "Peridot": '<svg width="30" height="30" fill="#B4C424"><circle cx="15" cy="15" r="12"/></svg>',
  "Sapphire": '<svg width="30" height="30" fill="#0F52BA"><circle cx="15" cy="15" r="12"/></svg>',
  "Opal": '<svg width="30" height="30" fill="#A8C3BC"><circle cx="15" cy="15" r="12"/></svg>',
  "Topaz": '<svg width="30" height="30" fill="#FFC87C"><circle cx="15" cy="15" r="12"/></svg>',
  "Turquoise": '<svg width="30" height="30" fill="#40E0D0"><circle cx="15" cy="15" r="12"/></svg>'
};

// ================= FUTURE PREDICTION =================
function getFuturePrediction(zodiac) {
  const predictions = {
    "Aries": ["Exciting challenges—trust your instincts!","A new opportunity at work could change your path."],
    "Taurus": ["Financial stability is on the horizon. Stay patient.","A close relationship may deepen unexpectedly."],
    "Gemini": ["Your communication skills will open new doors.","Travel or learning something new could be rewarding."],
    "Cancer": ["Take time for self-care; emotional growth awaits.","A family member may bring surprising good news."],
    "Leo": ["Your charisma shines—new friendships could flourish.","A creative project may gain recognition."],
    "Virgo": ["Attention to detail pays off in upcoming projects.","A healthy habit could lead to long-term benefits."],
    "Libra": ["Balance work and life to avoid stress.","A partnership or collaboration may bring success."],
    "Scorpio": ["Intense focus will help achieve personal goals.","An unexpected adventure may excite you."],
    "Sagittarius": ["A bold decision could lead to growth.","Learning something new expands your horizons."],
    "Capricorn": ["Hard work pays off—financial gains possible.","Leadership opportunities may present themselves."],
    "Aquarius": ["Innovation and creativity will bring recognition.","Helping others may give you personal satisfaction."],
    "Pisces": ["Listen to your intuition; it guides you well.","A new artistic or spiritual pursuit may appear."]
  };
  const zodiacPredictions = predictions[zodiac] || ["Exciting times are ahead!"];
  return zodiacPredictions[Math.floor(Math.random() * zodiacPredictions.length)];
}

// ================= AGE COUNTDOWN & LIVE TICKER =================
let secondsInterval;
let countdownInterval;

function getNextBirthday(dob, referenceDate=null) {
  const birth = new Date(dob);
  const now = referenceDate ? new Date(referenceDate) : new Date();
  let nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  if(nextBirthday < now) nextBirthday.setFullYear(now.getFullYear()+1);
  return nextBirthday;
}

function updateUI(ageObj, dob) {
  document.getElementById('years').textContent = ageObj.years;
  document.getElementById('months').textContent = ageObj.months;
  document.getElementById('days').textContent = ageObj.days;
  document.getElementById('hours').textContent = ageObj.totalHours;
  document.getElementById('minutes').textContent = ageObj.totalMinutes;
  document.getElementById('seconds').textContent = ageObj.totalSeconds;

  const birthDate = new Date(dob);
  const zodiac = getZodiac(birthDate.getMonth(), birthDate.getDate());
  const birthstoneName = getBirthstone(birthDate.getMonth());

  // Set Dynamic SVGs
  document.getElementById('zodiac-name').textContent = zodiac;
  document.getElementById('zodiac-icon').innerHTML = zodiacSVGs[zodiac] || "";
  document.getElementById('birthstone').textContent = birthstoneName;
  document.getElementById('birthstone-icon').innerHTML = birthstoneSVGs[birthstoneName] || "";
  document.getElementById('personal-character').textContent = getPersonalCharacter(zodiac);
  document.getElementById('future-prediction').textContent = getFuturePrediction(zodiac);

  // Show Cards
  document.getElementById('stats-card').style.display = 'flex';
  document.getElementById('countdown-card').style.display = 'flex';
  document.getElementById('fun-facts-card').style.display = 'flex';

  // Clear previous intervals
  clearInterval(secondsInterval);
  clearInterval(countdownInterval);

  const referenceDate = ageObj.referenceDate || new Date();

  // Live Seconds Ticker
  secondsInterval = setInterval(() => {
    const now = new Date();
    const totalSeconds = Math.floor((now - birthDate) / 1000);
    document.getElementById('seconds').textContent = totalSeconds;
  }, 1000);

  // Next Birthday Countdown
  const nextBday = getNextBirthday(dob);
  const countdownEl = document.getElementById('next-birthday');
  function updateCountdown() {
    const now = new Date();
    const diff = nextBday - now;
    if(diff <= 0) {
      countdownEl.textContent = "Happy Birthday! 🎉";
      clearInterval(countdownInterval);
      return;
    }
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff/(1000*60*60))%24);
    const minutes = Math.floor((diff/(1000*60))%60);
    const seconds = Math.floor((diff/1000)%60);
    countdownEl.textContent = `${days} Days ${hours} Hrs ${minutes} Min ${seconds} Sec`;
  }
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}

// ================= EVENT LISTENER =================
document.getElementById('calculate-btn').addEventListener('click', () => {
  const dob = document.getElementById('dob').value;
  const targetDate = document.getElementById('target-date').value;

  if(!dob) return alert("Please select your birthdate.");

  const age = calculatePreciseAge(dob, targetDate || null);
  if(!age) return alert("Invalid date. Birthdate cannot be after reference date.");

  updateUI(age, dob);
});
