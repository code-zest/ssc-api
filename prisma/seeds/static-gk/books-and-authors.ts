import { PrismaClient, LessonType, AccessTier, Difficulty } from "@prisma/client";

// --- DATA STRUCTURES --- //

interface BookEntry {
  book: string;
  author: string;
  year?: string;
}

const recentBooks: BookEntry[] = [
  { book: "Birsa Munda- Janjatiya Nayak", author: "Alok Chakrawal" },
  { book: "Queen of Fire", author: "Devika Rangachari" },
  { book: "Crunch Time: Narendra Modi's National Security Crises", author: "Sreeram Chaulia" },
  { book: "The Tiger of Drass: Capt. Anuj Nayyar, 23, Kargil Hero", author: "Meena Nayyar & Himmat Singh Shekhawat" },
  { book: "Decoding Indian Babudom", author: "Ashwini Shrivastava" },
  { book: "The Maverick Effect", author: "Harish Mehta" },
  { book: "Here Yourself", author: "Prem Rawat" },
  { book: "Not Just A Nightwatchman: My Innings with BCCI", author: "Vinod Rai" },
  { book: "The Boy Who Wrote a Constitution", author: "Rajesh Talwar" },
  { book: "The Magic of Mangalajodi", author: "Avinash Khemka" },
  { book: "The Sikh History of East India", author: "Avinash Mohapatra" },
  { book: "The Millennial Yogi", author: "Deepam Chatterjee" },
  { book: "Udaan Ek Majdoor Bachhe Ki", author: "Mithilesh Tiwari" },
  { book: "Tomb of Sand", author: "Geetanjali Shree" }
];

const prominentPersonalitiesBooks: BookEntry[] = [
  { book: "Your Best Day Is Today!", author: "Actor Anupam Kher's" },
  { book: "Rasaathi", author: "Sasindran Kallinkeel's" },
  { book: "Till We Win", author: "Randeep Guleria" },
  { book: "Pandemonium: The Great Indian Banking Tragedy", author: "Bandyopadhyay" },
  { book: "Bye Bye Corona", author: "Anandiben Patel" },
  { book: "Night of the Restless Spirits", author: "Sarbpreet Singh" },
  { book: "The Battle of Belonging", author: "Shashi Tharoor" },
  { book: "Portraits of Power, the autobiography of NK Singh, Chairman of 15th Finance Commission", author: "NK Singh" },
  { book: "The India Way: Strategies for an Uncertain World", author: "S Jaishankar" },
  { book: "Quest for Restoring Financial Stability in India", author: "Viral V. Acharya" },
  { book: "Overdraft: Saving the Indian Saver", author: "Urjit Patel" },
  { book: "A Song of India", author: "Ruskin Bond" },
  { book: "Hop On: My Adventures on Boats, Trains, and Planes", author: "Ruskin Bond" },
  { book: "One Arranged Murder", author: "Chetan Bhagat" },
  { book: "Burnt Sugar", author: "Avni Doshi" },
  { book: "Our Only Home: A Climate Appeal to the World", author: "Dalai Lama" },
  { book: "Legend of Suheldev: The King Who Saved India", author: "Amish Tripathi" },
  { book: "Klara and the Sun", author: "Kazuo Ishiguro" },
  { book: "The Ickabog", author: "JK Rowling" },
  { book: "Shuttling to the Top: The Story of P.V. Sindhu", author: "V. Krishnaswamy" },
  { book: "Sridevi: The Eternal Screen Goddess", author: "Satyarth Nayak" },
  { book: "The Big Boss of tittle Luv", author: "Karan Johar" },
  { book: "Voices of Dissent", author: "Romila Thapar" },
  { book: "Kitchens of Gratitude", author: "Vikas Khanna" },
  { book: "10 Rules of Successful Nations", author: "Ruchir Sharma" },
  { book: "A promised land", author: "Barack Obama" },
  { book: "The Commonwealth of Cricket", author: "Ramachandra Guha" },
  { book: "Azadi: Freedom. Fascism. Fiction Authored", author: "Arundhati Roy" },
  { book: "Judiciary, Judges and the Administration of Justice", author: "R. Banumathi" },
  { book: "Breaking The Cocoon @ 40", author: "Radha Nair" },
  { book: "Let Us Dream", author: "Pope Francis" },
  { book: "A bouquet of flowers", author: "Krishna Saksena" },
  { book: "Sach Kahun Toh", author: "Neena Gupta" },
  { book: "The Little Book of Green Nudges", author: "UNEP" },
  { book: "My Life In Design", author: "Gauri Khan" }
];

const importantBooksList: BookEntry[] = [
  { book: "\"Courts of India\"", author: "Chief Justice of India (CJI) Ranjan Gogoi", year: "2016" },
  { book: "Hemant Karkare: A Daughter's Memoir", author: "Karkare's Daughter Jui Karkare", year: "2019" },
  { book: "Braille Edition of 'Exam Warriors'", author: "Prime Minister Narendra Modi", year: "2018" },
  { book: "Bridgital Nation", author: "Shri N Chandrasekaran", year: "2019" },
  { book: "Girl Power: Indian Women Who Broke The Rules", author: "Neha J Hiranandani", year: "2020" },
  { book: "From Leeches to Slug Glue: 25 Explosive Ideas that Made (and Are Making) Modern Medicine", author: "Roopa Pai", year: "2019" },
  { book: "'150 Years of Celebrating the Mahatma-the South African Legacy'", author: "Fakir Hassen", year: "2019" },
  { book: "Turbulence and Triumph: The Modi Years", author: "Rahul Agarwal and Bharathi S Pradhan", year: "2020" },
  { book: "Handbook on Fisheries Statistics - 2018", author: "Ministry of fisheries", year: "2018" },
  { book: "Savarkar: Echoes from a forgotten past, 1883-1924", author: "Vikram Sampath", year: "2019" },
  { book: "Glorious Diaspora-Pride of India", author: "Indian Diaspora Club", year: "2019" },
  { book: "First They Erased Our Name: A Rohingya Speaks", author: "Habiburahman, Sophie Ansel", year: "2018" },
  { book: "Obama: The Call of History", author: "Peter Baker", year: "2017" },
  { book: "Kashmir's untold story: Declassification", author: "Iqbal Chand Malhotra and Maroof Raza", year: "2019" },
  { book: "\"Sridevi: Girl Woman Superstar\"", author: "Satyarth Nayak", year: "2019" },
  { book: "Department of Biotechnology (DBT) and Persistent Systems", author: "Manav", year: "-" },
  { book: "'The Commonwealth at 70: From Westminster to the World'", author: "St James House and the History of Parliament Trust", year: "2019" },
  { book: "Vivekadeepini", author: "Adi Shankaracharya", year: "2019" },
  { book: "Listening, Learning, and Leading", author: "Venkaiah Naidu", year: "2019" },
  { book: "'My Life, My Mission'", author: "Baba Ramdev", year: "2020" },
  { book: "'The New Delhi Conspiracy'", author: "Meenakshi Lekhi", year: "2019" },
  { book: "'The Diary of Manu Gandhi'", author: "Tridip Suhrud", year: "2019" },
  { book: "\"A Prime Minister to Remember- Memories of a Military Chief\"", author: "Sushil Kumar", year: "2019" },
  { book: "The Third Pillar", author: "Raghuram Rajan", year: "2019" },
  { book: "\"Lessons Life Taught Me Unknowingly\"", author: "Anupam Kher", year: "2019" },
  { book: "\"Cricket World Cup: The Indian Challenge\"", author: "Ashis Ray", year: "2015" },
  { book: "My Journey", author: "Dr. A.P.J. Abdul Kalam", year: "2013" },
  { book: "Making of New India", author: "Dr. Bibek Debroy", year: "2019" },
  { book: "\"Whispers of Time\"", author: "Dr. Krishna Saksena", year: "2019" },
  { book: "Indian Fiscal Federalism", author: "Dr. Y.V. Reddy", year: "2018" },
  { book: "'Chequered Brilliance: The Many Lives of V K Krishna Menon'", author: "Jairam Ramesh", year: "2019" },
  { book: "'Designing Destiny: The Heartfulness Way'", author: "Kamlesh Patel Alias Daaji", year: "2019" },
  { book: "The Heartfulness Way: Heart-Based Meditations for Spiritual Transformation", author: "Kamlesh Patil & Joshua Pollock", year: "2018" },
  { book: "Darkness to light", author: "Lamar Odom", year: "2019" },
  { book: "Fire and Fury Corps - Saga of Valour, Fortitude and Sacrifice", author: "Lieutenant General Ranbir Singh", year: "2019" },
  { book: "Quality, Accreditation, and Ranking - A Silent Revolution in the Offing in Indian Higher Education", author: "M Venkaiah Naidu", year: "2018" },
  { book: "We Are Displaced", author: "Malala Yousafzai", year: "2019" },
  { book: "Saffron Swords: Centuries of Indic Resistance to Invaders", author: "Manoshi Sinha Rawal", year: "2019" },
  { book: "\"The New Delhi Conspiracy\"", author: "Meenakshi Lekhi", year: "2019" },
  { book: "'Law, Justice and Judicial Power- Justice P N Bhagwati's Approach'", author: "Mool Chand Sharma", year: "2019" },
  { book: "'Khooni Vaisakhi'", author: "Mr. Suri", year: "2019" },
  { book: "'Every Vote Counts- The story of India's Elections'", author: "Navin Chawla", year: "2019" },
  { book: "'Virat: The making of a Champion'", author: "Neeraj Jha, Vidhanshu Kumar", year: "2019" },
  { book: "'Undaunted: Saving the Idea of India'", author: "P. Chidambaram", year: "2014" },
  { book: "From Possession to Freedom", author: "R Uma Maheswari", year: "2018" },
  { book: "Speaking Truth to Power", author: "P. Chidambaram", year: "2018" },
  { book: "Politics of Jugaad: The Coalition Handbook", author: "Saba Naqvi", year: "2019" },
  { book: "Game Changer", author: "Shahid Afridi and Wajahat S. Khan", year: "2019" },
  { book: "'Kundan: Saigal's Life & Music'", author: "Sharad Dutt", year: "2019" },
  { book: "\"Chandra Shekhar - The Last Icon of Ideological Politics\"", author: "Shri Harivansh and Shri Ravi Dutt Bajpai", year: "2019" },
  { book: "'Defining India: Through Their Eyes'", author: "Sonia Singh", year: "2019" },
  { book: "'Function of Data Sovereignty - The Pursuit of Supremacy'", author: "Vinit Goenka", year: "2019" },
  { book: "'Ayodhya: City of Faith, City of Discord'", author: "Valay Singh", year: "2018" },
  { book: "A Rural Manifesto - Realising India's Future through her Villages", author: "BJP MP Varun Gandhi", year: "2018" },
  { book: "Changing India", author: "Dr. Manmohan Singh", year: "2019" },
  { book: "Timeless Laxman", author: "Prime Minister Narendra Modi", year: "2018" },
  { book: "The Fire Burns Blue: A History of Women's Cricket in India", author: "Karunya Keshav and Sidhanta Pathak", year: "2018" },
  { book: "Maharana Pratap: The Invincible Warrior", author: "Rima Hooja", year: "2019" },
  { book: "The Paradoxical Prime Minister", author: "Shashi Tharoor", year: "2018" },
  { book: "The Rule Breakers", author: "Preeti Shenoy", year: "2018" },
  { book: "Experiential Learning - Gandhiji's Nai Talim", author: "Union Minister of Human Resource Development Prakash Javadekar", year: "2018" },
  { book: "From Lehman to Demonetisation: A Decade of Disruption, Reforms, and Misadventures", author: "Tamal Bandyopadhyay", year: "2017" },
  { book: "Poonachi or the Story of a Black Goat", author: "Perumal Murugan", year: "2018" },
  { book: "Making of Legend", author: "Bindeshwar Pathak", year: "2017" },
  { book: "Diabetes with Delight", author: "Anoop Misra", year: "2018" },
  { book: "The Last White Hunter", author: "Donald Anderson with Joshua Mathew", year: "2018" },
  { book: "Indian Cultures as Heritage", author: "Romila Thapar", year: "2018" },
  { book: "Strangers No More: New Narratives from Northeast", author: "Sanjoy Hazarika", year: "2018" },
  { book: "Matoshree", author: "Sumitra Mahajan", year: "2017" },
  { book: "Sanjay Dutt: The Crazy Untold Story of Bollywood's Bad Boy", author: "Yasser Usman", year: "2018" },
  { book: "Indian Instinct", author: "Miniya Chatterjee", year: "2018" },
  { book: "The Coalition years", author: "Pranab Mukherjee", year: "2017" },
  { book: "Dreamers: How Young Indians Are Changing Their World", author: "Snigdha Poonam", year: "2018" },
  { book: "Fire and Fury: Inside the Trump Whitehouse", author: "Michael Wolff", year: "2018" },
  { book: "Citizen Delhi: My Times, My Life", author: "Sheila Dikshit", year: "2018" },
  { book: "Mahatma Gandhi", author: "India of my dreams", year: "1947" },
  { book: "Born to be Hanged: Political Biography of Zulfikar Ali Bhutto", author: "Syeda Saiyidan Hameed", year: "2018" },
  { book: "Ants Among Elephants", author: "Dujatha Gidla", year: "2017" },
  { book: "The Constitution of India: Miracle, Surrender, Hope", author: "Rajeev Dhavan", year: "2017" },
  { book: "The Year of the Hawks", author: "Kanwaljit Singh", year: "2017" },
  { book: "A World of Three Zeroes: The New Economics of Zero Poverty, Zero Unemployment, and Zero Carbon Emission", author: "Mohammad Yunus", year: "2017" },
  { book: "Do We Not Bleed? Reflections of a 21st-Century Pakistan", author: "Mehr Tarar", year: "2018" },
  { book: "The Book Hunters of Katpadi", author: "Pradeep Sebastian", year: "2017" },
  { book: "All the Worlds Between", author: "K Srilata and Fiona Bolger", year: "2017" },
  { book: "Hit Refresh", author: "Satya Nadella", year: "2017" },
  { book: "Letters to a Young Philosopher", author: "Ramin Jahanbegloo", year: "2018" },
  { book: "Imperfect (autobiography)", author: "Sanjay Manjrekar", year: "2018" },
  { book: "Immortal India", author: "Amish Tripathi", year: "2017" },
  { book: "Maharana Pratap: The Invincible Warrior", author: "Rima Hooja", year: "2018" },
  { book: "Conflicts of Interest: My Journey Through India's Green Movement", author: "Sunita Narain", year: "2017" },
  { book: "2G Saga Unfolds", author: "Andimuthu Raja", year: "2018" },
  { book: "An Ordinary Mans Guide to Radicalism", author: "Neyaz Farooqui", year: "2018" },
  { book: "Why I am Hindu", author: "Shashi Tharoor", year: "2018" },
  { book: "A dairy of domestic diva", author: "Shilpa Shetty", year: "2018" },
  { book: "The New Wealth of Nations", author: "Surjit S Bhalla", year: "2017" },
  { book: "Indira Gandhi: A Life in Nature", author: "Jairam Ramesh", year: "2017" },
  { book: "Dreamers: How Young Indians are Changing Their World and Yours", author: "Poonam", year: "2018" },
  { book: "My Enemy's Enemy: India in Afghanistan from the Soviet Invasion to the US Withdrawal", author: "Avinash Paliwal", year: "2017" },
  { book: "A state of freedom", author: "Neel Mukherjee", year: "2017" },
  { book: "Enemies and Neighbours: Arabs and Jews in Palestine and Israel, 1917-2017", author: "Ian Black", year: "2017" },
  { book: "I do what I do", author: "Raghuram Rajan", year: "2017" },
  { book: "Indian Political Theory: Laying the Groundwork for Swaraj", author: "Aakash Singh Rathore", year: "2017" },
  { book: "An unsuitable boy", author: "Karan johar", year: "2016" },
  { book: "Stalin: Waiting for Hitler 1928-1941", author: "Stephen Kotkin", year: "2017" },
  { book: "281 and Beyond", author: "V V S Laxman", year: "2018" },
  { book: "History of Wolves", author: "Emily Fridlund", year: "2017" },
  { book: "Lincoln in the Bardo", author: "George Saunders", year: "2017" },
  { book: "Writing Pakistan: Conversations on identity, Nationhood, and Fiction", author: "Mushtaq Bilal", year: "2016" },
  { book: "The Bengalis: A Portrait of a Community", author: "Sudeep Chakravarti", year: "2017" },
  { book: "Moments of truth: My Life with Acting", author: "Roshan Taneja", year: "2017" },
  { book: "The Widow of Malabar Hills", author: "Sujata Massey", year: "2018" },
  { book: "Where India Goes", author: "Diane Coffey and Dean Spears", year: "2017" },
  { book: "The Nationalist", author: "Minhaz Merchant", year: "2017" },
  { book: "Political Violence in Ancient India", author: "Upinder Singh", year: "2017" },
  { book: "A Tale of Two Victoria Crosses", author: "Lt Gen Baljit Singh", year: "2017" },
  { book: "Fifty Things that Made the Modern Economy", author: "Tim Harford", year: "2017" },
  { book: "New Wealth of Nations", author: "Surjit Bhalla", year: "2017" },
  { book: "The Emergency: Indian Democracy's Darkest Hour", author: "A Surya Prakash", year: "2017" },
  { book: "No Room for Small Dreams", author: "Shimon Peres", year: "-" },
  { book: "A Horse Walks Into a Bar", author: "David Grossman", year: "2014" },
  { book: "An Ordinary Life: A Memoir", author: "Nawazuddin Siddiqui with Ritupama Chatterjee", year: "2017" },
  { book: "Democracy's XI: The Great Indian Cricket Story", author: "Rajdeep Sardesai", year: "2017" },
  { book: "A Republic in the Making: India in the 1950s", author: "Gyanesh Kudaisya", year: "2017" },
  { book: "Durand's Curse: A Line Across the Pathan Heart", author: "Rajiv Dogra", year: "2017" },
  { book: "The Crisis Within: On Knowledge and Education in India", author: "GN Denvy", year: "2017" },
  { book: "Inside Parliament: Views From the Front Row", author: "Derek O'Brien", year: "2017" },
  { book: "India Turns East: International Engagement and US-China Rivalry", author: "Fredrick Grare", year: "2017" },
  { book: "The Ministry of Utmost Happiness", author: "Arundhati Roy", year: "2017" },
  { book: "China & India War: Collision Course on the Roof of the World", author: "Bertil Lintner", year: "2018" },
  { book: "Cadres of Tibet", author: "Jayadeva Ranade", year: "2017" },
  { book: "Unstoppable: My Life So Far", author: "Maria Sharapova", year: "2017" },
  { book: "The Book of Chocolate Saints", author: "Jeet Thayil", year: "2017" },
  { book: "Conflict of Interest", author: "Sunita Narain", year: "2019" },
  { book: "Atal Ji Ne Kaha", author: "Birendra Rehi", year: "2018" },
  { book: "Confessions of a dying mind: the blind faith of atheism", author: "Kiren Rijiju and Haulianlal Guite", year: "2017" },
  { book: "Ashoka: Satrap of Taxila", author: "Ashok K Banker", year: "2017" },
  { book: "Loyal Stalkers", author: "Chhimi Tenduf La", year: "2017" },
  { book: "No Spin", author: "Shane Warne", year: "2018" },
  { book: "Attendant Lords", author: "TCA Raghavan", year: "2017" },
  { book: "The Driver in the Driverless Car", author: "Vivek Wadhwa with Alex Salkever", year: "2017" },
  { book: "Life Among the Scorpions: Memoir of a Woman in Indian Politics", author: "Jaya Jaitely", year: "2017" },
  { book: "Gorbachev: His Life and Times", author: "William Taubman", year: "2017" },
  { book: "Ambedkar Gandhi and Patel: The Making of India's Electoral System", author: "Raja Shekhar Vundru", year: "2017" },
  { book: "Exam Warriors", author: "Narendra Modi", year: "2018" },
  { book: "Evil in the Mahabharata", author: "Meena Arora Nayak", year: "2018" },
  { book: "Happy Dreams", author: "Jia Pingwa", year: "2017" },
  { book: "Rohingya Inside Myanmar's Hidden Genocide", author: "Azeem Ibrahim", year: "2016" },
  { book: "Myanmar's Enemy Within: Buddhist Nationalism and Anti-Muslim Violence", author: "Francis Wade", year: "2017" },
  { book: "Reimagining Pakistan", author: "Husain Haqqani", year: "2018" },
  { book: "Born to be Hanged: Political Biography of Zulfikar Ali Bhutto", author: "Syeda Hameed", year: "2018" },
  { book: "Reporting Pakistan", author: "Meena Menon", year: "2017" },
  { book: "Who We Are and How We Got Here", author: "David Reich", year: "2018" },
  { book: "A Century is Not Enough", author: "Sourav Ganguly", year: "2018" },
  { book: "Winning Like Sourav: Think & Succeed Like Ganguly", author: "Abhirup Bhattacharya", year: "2018" },
  { book: "The Perils of Being Moderately Famous", author: "Soha Ali Khan", year: "2017" },
  { book: "Directorate S: The CLA and Americas Secret Wars in Afghanistan and Pakistan", author: "Steye Coll", year: "2018" },
  { book: "Economics for the Common Good", author: "Jean Tirole", year: "2016" },
  { book: "Political Tribes", author: "Amy Chua", year: "2018" },
  { book: "Dividing Lines: Contours of the India-China Discord", author: "KN Raghavan", year: "2012" },
  { book: "My Journey from Marxism-Leninism to Nehruvian Socialism", author: "CH Hanumantha Rao", year: "2018" },
  { book: "Triple Talaq: Examining Faith", author: "Salman Khurshid", year: "2018" },
  { book: "Kashmir: Exploring the Myth Behind the Narrative", author: "Khalid Bashir", year: "2017" },
  { book: "The Only Story", author: "Julian Barnes", year: "2018" },
  { book: "She Goes to War Women Militants of India", author: "Rashmi Saksena", year: "2018" },
  { book: "The Future of Humanity", author: "Michio Kaku", year: "2018" },
  { book: "Governing the Ungovernable: Institutional Reforms for Democratic Governance", author: "Ishrat Husain", year: "2018" },
  { book: "The Unseeing Idol of Light", author: "KR Meera", year: "2018" },
  { book: "Anita Gets Bail: What Are Our Courts Doing? What Should We Do About Them?", author: "Arun Shourie", year: "2018" },
  { book: "Eleven Gods and a Billion Indians", author: "Boria Majumdar", year: "2018" },
  { book: "Indian Railway- The weaving of a National Tapestry", author: "Bibek Debroy", year: "2017" },
  { book: "An Uncertain Glory: India and Its Contradiction", author: "Amartya Sen and Jean Dreze", year: "2013" },
  { book: "Lethal White", author: "Robert Galbraith (JK Rowling)", year: "2018" },
  { book: "The English Patient", author: "Michael Ondaatje", year: "-" },
  { book: "Wakeup India", author: "Annie Besant", year: "1992" },
  { book: "The Broken Wing", author: "Sarojini Naidu", year: "1913" },
  { book: "Discovery of India", author: "Pt. Jawaharlal Nehru", year: "1917" },
  { book: "Planned Economy for India", author: "Sir. M Visweswarayya", year: "1946" }
];

const autobiographies: BookEntry[] = [
  { book: "The Story of my experiments with truth", author: "Mahatma Gandhi" },
  { book: "Wings of fire", author: "A.P.J. Abdul Kalam" },
  { book: "An Autobiography", author: "Pt. Jawaharlal Nehru" },
  { book: "One life is not enough", author: "K. Natwar Singh" },
  { book: "My nation, my life", author: "L.K. Advani" },
  { book: "Playing it my way", author: "Sachin Tendulkar" },
  { book: "Century is not enough", author: "Saurav Ganguly" },
  { book: "The race of my life", author: "Milkha Singh" },
  { book: "A shot at history", author: "Abhinav Bindra" },
  { book: "The test of my life", author: "Yuvraj Singh" },
  { book: "Straight from my heart", author: "Kapil Dev" },
  { book: "ACE against odds", author: "Sania Mirza" },
  { book: "Playing to win", author: "Saina Nehwal" },
  { book: "Unbreakable", author: "M.C. Marykom" },
  { book: "Born again on mountain", author: "Arunima Sinha" }
];

// --- UTILITY TO RENDER TABLE --- //
function renderTableHtml(data: BookEntry[], hasYear: boolean = false): string {
  let rowsHtml = data.map(item => `
    <tr class="bg-card hover:bg-accent hover:text-accent-foreground transition-colors border-b border-border last:border-0">
      <td class="px-6 py-4 font-semibold text-foreground whitespace-normal">${item.book}</td>
      <td class="px-6 py-4 text-muted-foreground whitespace-normal">${item.author}</td>
      ${hasYear ? `<td class="px-6 py-4 text-muted-foreground">${item.year || '-'}</td>` : ''}
    </tr>
  `).join("");

  return `
    <div class="overflow-x-auto rounded-xl border border-border shadow-sm mt-6">
      <table class="w-full text-sm text-left border-collapse">
        <thead class="text-xs uppercase bg-muted text-muted-foreground">
          <tr>
            <th scope="col" class="px-6 py-4 border-b border-border">Book Name</th>
            <th scope="col" class="px-6 py-4 border-b border-border">Author Name</th>
            ${hasYear ? `<th scope="col" class="px-6 py-4 border-b border-border">Published Year</th>` : ''}
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>
  `;
}

// --- ORCHESTRATOR --- //

export async function seedBooksAndAuthors(prisma: PrismaClient, subjectId: string) {
  console.log("  -> Seeding Books and Authors Chapter...");

  const chapter = await prisma.chapter.upsert({
    where: { subjectId_slug: { subjectId, slug: "books-and-authors" } },
    update: { name: "Books and Authors", order: 5, isActive: true },
    create: {
      subjectId,
      name: "Books and Authors",
      slug: "books-and-authors",
      description: "Comprehensive lists of important books and their authors.",
      order: 5,
      isActive: true,
    },
  });

  const parts = [
    {
      slug: "recent-books",
      title: "Top & Recent Books",
      description: "A quick rundown of top and recently published books and their respective authors.",
      data: recentBooks,
      hasYear: false,
      order: 1
    },
    {
      slug: "books-by-prominent-personalities",
      title: "Books by Prominent Personalities",
      description: "Must-know books written by famous personalities, leaders, and celebrities.",
      data: prominentPersonalitiesBooks,
      hasYear: false,
      order: 2
    },
    {
      slug: "important-books-list",
      title: "Comprehensive List of Important Books",
      description: "The complete, numbered list of important books commonly tested in exams.",
      data: importantBooksList,
      hasYear: true,
      order: 3
    },
    {
      slug: "important-autobiographies",
      title: "Important Autobiographies by Indians",
      description: "A specialized list covering autobiographies of prominent Indian personalities.",
      data: autobiographies,
      hasYear: false,
      order: 4
    }
  ];

  for (const part of parts) {
    const articleHtml = `
      <div class="space-y-6">
        <div class="prose prose-slate dark:prose-invert max-w-none">
          <p>${part.description}</p>
        </div>
        ${renderTableHtml(part.data, part.hasYear)}
      </div>
    `;

    await prisma.lesson.upsert({
      where: { chapterId_slug: { chapterId: chapter.id, slug: part.slug } },
      update: { title: part.title, articleHtml },
      create: {
        chapterId: chapter.id,
        subjectId,
        title: part.title,
        slug: part.slug,
        type: LessonType.ARTICLE,
        articleHtml,
        order: part.order,
        accessTier: AccessTier.FREE,
        isActive: true,
        durationMins: Math.ceil(part.data.length / 5), // Rough estimation
      }
    });
  }

  // --- PRACTICE SET --- //
  let practiceSet = await prisma.practiceSet.findFirst({
    where: { chapterId: chapter.id, title: "Books and Authors Practice Set" }
  });

  if (!practiceSet) {
    practiceSet = await prisma.practiceSet.create({
      data: {
        subjectId,
        chapterId: chapter.id,
        title: "Books and Authors Practice Set",
        order: 1,
        accessTier: AccessTier.FREE,
        isActive: true,
      }
    });
  }

  const questionsData = [
    {
      text: "The book \"Life Among the Scorpions: Memoir of a Woman in Indian Politics\" was written by ___?",
      options: ["Meghna Pant", "Hunter Biden", "Peter Mukerjea", "Ramesh Kandula", "Jaya Jaitely"],
      correct: "Jaya Jaitely",
      difficulty: Difficulty.MEDIUM,
      explanation: "Jaya Jaitely is the author of 'Life Among the Scorpions'."
    },
    {
      text: "Who among the following has authored the \"Dynasty to Democracy: The Untold Story of Smriti Irani's Triumph\"?",
      options: ["Anindya Dutta", "Anant Vijay's", "Meghan Markle", "Viral V. Acharya", "Jhumpa Lahiri"],
      correct: "Anant Vijay's",
      difficulty: Difficulty.MEDIUM,
      explanation: "Anant Vijay authored the book 'Dynasty to Democracy'."
    },
    {
      text: "The Story of my experiments with truth' is the Autobiography of ______?",
      options: ["Mahatma Gandhi", "Yuvraj Singh", "Milkha Singh", "Sania mirza", "Pt. Jawaharlal Nehru"],
      correct: "Mahatma Gandhi",
      difficulty: Difficulty.EASY,
      explanation: "It is the famous autobiography of Mahatma Gandhi."
    },
    {
      text: "The book 'The Terrible, Horrible, Very Bad Good News' was written by ___?",
      options: ["Meghna Pant", "Hunter Biden", "Peter Mukerjea", "Ramesh Kandula", "R. Kaushik"],
      correct: "Meghna Pant",
      difficulty: Difficulty.MEDIUM,
      explanation: "Meghna Pant authored this book."
    },
    {
      text: "The book 'Platform Scale: For a Post-Pandemic World' was written by ___?",
      options: ["S Y Quraishi", "Romila Thapar", "R. Giridharan", "Sangeet Paul Choudhary", "KR Meera"],
      correct: "Sangeet Paul Choudhary",
      difficulty: Difficulty.HARD,
      explanation: "Sangeet Paul Choudhary authored 'Platform Scale'."
    },
    {
      text: "Who is the Author of the Book 'India's 71-Year Test: The Journey to Triumph in Australia'?",
      options: ["R. Kaushik", "Ramesh Kandul", "R. Giridharan", "Paul Choudhary", "Alfredo Coveli"],
      correct: "R. Kaushik",
      difficulty: Difficulty.MEDIUM,
      explanation: "R. Kaushik wrote 'India's 71-Year Test'."
    },
    {
      text: "The book 'The Ministry of Utmost Happiness' was written by ___?",
      options: ["L.K.Advani", "Meira Kumar", "Ravinder Singh", "Jairam Ramesh", "Arundhati Roy"],
      correct: "Arundhati Roy",
      difficulty: Difficulty.EASY,
      explanation: "Arundhati Roy is the acclaimed author of this book."
    },
    {
      text: "Who is the Author of the Book The Little Book of Encouragement'?",
      options: ["Dalai Lama", "Hunter Biden", "Peter Mukerjea", "Nitin Gokhale", "Waman Subha Prabhu"],
      correct: "Dalai Lama",
      difficulty: Difficulty.EASY,
      explanation: "The Dalai Lama wrote 'The Little Book of Encouragement'."
    },
    {
      text: "Who is the Author of the Book 'The Nutmeg's Curse: Parables for a Planet in Crisis'?",
      options: ["Amitav Ghosh", "Pradeep Baijal", "V.S Naipaul", "Jhumpa Lahiri", "Jairam Ramesh"],
      correct: "Amitav Ghosh",
      difficulty: Difficulty.MEDIUM,
      explanation: "Amitav Ghosh authored 'The Nutmeg's Curse'."
    },
    {
      text: "Who of the following is the author of the book, 'The Broken Wing'?",
      options: ["Dr. A.P.J. Abdul Kalam", "Sarojini Naidu", "Vikram Seth", "Arundhati Roy", "Jhumpa Lahiri"],
      correct: "Sarojini Naidu",
      difficulty: Difficulty.MEDIUM,
      explanation: "Sarojini Naidu, known as the Nightingale of India, wrote 'The Broken Wing'."
    }
  ];

  for (let i = 0; i < questionsData.length; i++) {
    const q = questionsData[i];
    
    let existingQuestion = await prisma.question.findFirst({
      where: { chapterId: chapter.id, questionText: q.text }
    });

    if (existingQuestion) {
      await prisma.question.update({
        where: { id: existingQuestion.id },
        data: {
          options: q.options,
          correctOption: q.correct,
          explanation: q.explanation,
          difficulty: q.difficulty,
          practiceSets: {
            upsert: {
              where: { practiceSetId_questionId: { practiceSetId: practiceSet.id, questionId: existingQuestion.id } },
              update: { order: i + 1 },
              create: { practiceSetId: practiceSet.id, order: i + 1 }
            }
          }
        }
      });
    } else {
      await prisma.question.create({
        data: {
          subjectId,
          chapterId: chapter.id,
          questionText: q.text,
          options: q.options,
          correctOption: q.correct,
          explanation: q.explanation,
          difficulty: q.difficulty,
          isActive: true,
          practiceSets: { create: { practiceSetId: practiceSet.id, order: i + 1 } }
        }
      });
    }
  }

  console.log("  -> Books and Authors seed complete.");
}
