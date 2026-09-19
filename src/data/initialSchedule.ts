import { SatsangRecord, DayOfWeek } from '../types';

export const INITIAL_SATSANG_RECORDS: SatsangRecord[] = [
  // Page 1 - SUNDAY & MONDAY
  {
    id: "rec-001",
    day: "SUNDAY",
    branch: "TITWALA",
    satsang_place: "ATALI AMBIVALI WEST (SUNDAY)",
    prabandhak_name: "REV. SAMPAT RAO AVALE JI",
    contact_no: "9323079705",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-002",
    day: "SUNDAY",
    branch: "TITWALA",
    satsang_place: "NARI SATSANG TITWALA EAST (SUNDAY 1/3)",
    prabandhak_name: "REV. SONI KANOJIYA JI",
    contact_no: "8286471701",
    time: "3.00 PM TO 5.00 PM"
  },
  {
    id: "rec-003",
    day: "SUNDAY",
    branch: "VASIND",
    satsang_place: "VASIND (SUNDAY)",
    prabandhak_name: "REV. BHAU L. BHOIR JI",
    contact_no: "8793466338",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-004",
    day: "SUNDAY",
    branch: "BHISOL",
    satsang_place: "BHISOL SATSANG BHAWAN (SUNDAY)",
    prabandhak_name: "REV. SADASHIV SASE JI",
    contact_no: "9221666676",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-005",
    day: "SUNDAY",
    branch: "SHAHAPUR",
    satsang_place: "SHAHAPUR SATSANG BHAWAN (SUNDAY)",
    prabandhak_name: "REV. SHAILENDRA SAPKALE JI",
    contact_no: "7977831682",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-006",
    day: "SUNDAY",
    branch: "KASARA",
    satsang_place: "KASARA SATSANG BHAWAN (SUNDAY)",
    prabandhak_name: "REV. NIVRUTTI HARI WAGH JI",
    contact_no: "7875891436",
    time: "3.00 PM TO 5.00 PM"
  },
  {
    id: "rec-007",
    day: "SUNDAY",
    branch: "KASARA",
    satsang_place: "VIHIRICHAPADA SATSANG BHAWAN (SUNDAY)",
    prabandhak_name: "REV. SOMNATH BUDHA HIVRE JI",
    contact_no: "7249522816",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-008",
    day: "SUNDAY",
    branch: "ULHASNAGAR",
    satsang_place: "SHAHAD SATSANG BHAWAN (SUNDAY)",
    prabandhak_name: "REV. HARESH CHELLANI JI",
    contact_no: "9324791264",
    time: "11.00 AM TO 1.00 PM"
  },
  {
    id: "rec-009",
    day: "SUNDAY",
    branch: "AMBARNATH",
    satsang_place: "SHIVAJI NAGAR (SUNDAY)",
    prabandhak_name: "REV. R.P. YADAV JI",
    contact_no: "9503922872",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-010",
    day: "SUNDAY",
    branch: "DWARLIPADA",
    satsang_place: "DWARLIPADA SATSANG BHAWAN (SUNDAY)",
    prabandhak_name: "REV. DASHRATH MHATRE JI (Mukhi)",
    contact_no: "9326076536",
    time: "10.00 AM TO 12.00 PM"
  },
  {
    id: "rec-011",
    day: "SUNDAY",
    branch: "DOMBIVLI",
    satsang_place: "DOMBIVLI SATSANG BHAWAN (SUNDAY)",
    prabandhak_name: "REV. CHANDRAKANT KANSE JI",
    contact_no: "9833590574",
    time: "10.00 AM TO 12.00 PM"
  },
  {
    id: "rec-012",
    day: "SUNDAY",
    branch: "DOMBIVLI",
    satsang_place: "NARI SATSANG KOPAR (SUNDAY 2/4)",
    prabandhak_name: "REV. DEEPAK MHATRE JI",
    contact_no: "9619610159",
    time: "3.00 PM TO 5.00 PM"
  },
  {
    id: "rec-013",
    day: "SUNDAY",
    branch: "GOGRASWADI",
    satsang_place: "NARI SATSANG SAHAGAON (SUNDAY LAST)",
    prabandhak_name: "REV. ANANT MHATRE JI",
    contact_no: "8291239023",
    time: "3.00 PM TO 5.00 PM"
  },
  {
    id: "rec-014",
    day: "SUNDAY",
    branch: "SONARPADA",
    satsang_place: "LODHA HEAVEN (SUNDAY)",
    prabandhak_name: "REV. KISHIN CHACHLANI JI",
    contact_no: "8655311861",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-015",
    day: "SUNDAY",
    branch: "THAKURLI",
    satsang_place: "GOLAVLI SATSANG BHAWAN (SUNDAY)",
    prabandhak_name: "REV. DIGAMBAR GAIKWAD JI",
    contact_no: "8291224441",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-016",
    day: "SUNDAY",
    branch: "KALYAN",
    satsang_place: "RAMNAGARI (SUNDAY)",
    prabandhak_name: "REV. SHANKAR SAHANI JI",
    contact_no: "9821684959",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-017",
    day: "SUNDAY",
    branch: "VITTHALWADI",
    satsang_place: "VITTHALWADI SATSANG BHAWAN (SUNDAY)",
    prabandhak_name: "REV. AVINASH MANE JI (Mukhi)",
    contact_no: "9324475898",
    time: "10.00 AM TO 12.00 PM"
  },
  {
    id: "rec-018",
    day: "SUNDAY",
    branch: "BADLAPUR",
    satsang_place: "BADLAPUR SATSANG BHAWAN (SUNDAY)",
    prabandhak_name: "REV. MADHAV PONDE JI (Mukhi)",
    contact_no: "9322296182",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-019",
    day: "SUNDAY",
    branch: "SAWARNE",
    satsang_place: "SAWARNE (SUNDAY)",
    prabandhak_name: "REV. RAGHUNATH KHAKAR JI (Mukhi)",
    contact_no: "7620015534",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-020",
    day: "SUNDAY",
    branch: "BHIWANDI",
    satsang_place: "BHIWANDI SATSANG BHAWAN (SUNDAY)",
    prabandhak_name: "REV. RAVASAHEB HASBE JI",
    contact_no: "9869425283",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-021",
    day: "SUNDAY",
    branch: "BHIWANDI",
    satsang_place: "MANKOLI (SUNDAY)",
    prabandhak_name: "",
    contact_no: "",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-022",
    day: "SUNDAY",
    branch: "BHIWANDI",
    satsang_place: "NARI SATSANG KAMATGHAR (SUNDAY)",
    prabandhak_name: "REV. VINOD KANOJIYA",
    contact_no: "9860959605",
    time: "3.00 PM TO 5.00 PM"
  },
  {
    id: "rec-023",
    day: "MONDAY",
    branch: "VASIND",
    satsang_place: "SHEI (MONDAY)",
    prabandhak_name: "REV. NAMDEV TARMALE JI",
    contact_no: "9272987319",
    time: "7.00 PM TO 9.00 PM"
  },

  // Page 2 - MONDAY
  {
    id: "rec-024",
    day: "MONDAY",
    branch: "VASIND",
    satsang_place: "VEHLONDA (MONDAY)",
    prabandhak_name: "REV. RAVI KURKUTE JI",
    contact_no: "7057409694",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-025",
    day: "MONDAY",
    branch: "BHISOL",
    satsang_place: "NARI SATSANG BHISOL BHAWAN (MONDAY 2/4)",
    prabandhak_name: "REV. SANCHITA SASE JI",
    contact_no: "8928463213",
    time: "3.00 PM TO 5.00 PM"
  },
  {
    id: "rec-026",
    day: "MONDAY",
    branch: "SHAHAPUR",
    satsang_place: "SAVAROLI (MONDAY)",
    prabandhak_name: "REV. ASHOK DHONGADE JI",
    contact_no: "8237970054",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-027",
    day: "MONDAY",
    branch: "KASARA",
    satsang_place: "UMBARMALI (MONDAY)",
    prabandhak_name: "REV. BHAU YASHVANT CHAURE JI",
    contact_no: "9082485098",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-028",
    day: "MONDAY",
    branch: "ULHASNAGAR",
    satsang_place: "DOODHNAKA SATSANG BHAWAN (MONDAY)",
    prabandhak_name: "REV. MAHESH MAKHIJA JI",
    contact_no: "8850824719",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-029",
    day: "MONDAY",
    branch: "ULHASNAGAR",
    satsang_place: "SHAHAD RAILWAY STATION (MONDAY)",
    prabandhak_name: "REV. VIJAY JAISWAR JI",
    contact_no: "9730282267",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-030",
    day: "MONDAY",
    branch: "AMBARNATH",
    satsang_place: "CIRCUS GROUND (MONDAY)",
    prabandhak_name: "REV. SAGAR JAISWAR JI",
    contact_no: "8421253882",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-031",
    day: "MONDAY",
    branch: "AMBARNATH",
    satsang_place: "NARI SATSANG BARKU PADA BHAWAN (MONDAY)",
    prabandhak_name: "REV. SANTARAM DABE JI",
    contact_no: "9552202891",
    time: "3.00 PM TO 5.00 PM"
  },
  {
    id: "rec-032",
    day: "MONDAY",
    branch: "DWARLIPADA",
    satsang_place: "NEVALI NAKA SATSANG BHAWAN (MONDAY)",
    prabandhak_name: "REV. DASHRATH MHATRE JI (Mukhi)",
    contact_no: "9326076536",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-033",
    day: "MONDAY",
    branch: "DWARLIPADA",
    satsang_place: "MANERA GAON SATSANG BHAWAN (MONDAY)",
    prabandhak_name: "REV. CHANDAR JOSHI JI",
    contact_no: "7447883311",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-034",
    day: "MONDAY",
    branch: "DOMBIVLI",
    satsang_place: "GAONDEVI (MONDAY)",
    prabandhak_name: "REV. VINANTI SAKHALKAR JI",
    contact_no: "9594914606",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-035",
    day: "MONDAY",
    branch: "GOGRASWADI",
    satsang_place: "AYRE GAON (MONDAY)",
    prabandhak_name: "REV. VINOD KENE JI",
    contact_no: "9821206650",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-036",
    day: "MONDAY",
    branch: "GOGRASWADI",
    satsang_place: "NARI SATSANG GOGRASWADI (MONDAY)",
    prabandhak_name: "REV. JAIDEV GAIKWAD JI",
    contact_no: "9773466580",
    time: "3.00 PM TO 5.00 PM"
  },
  {
    id: "rec-037",
    day: "MONDAY",
    branch: "SONARPADA",
    satsang_place: "SONARPADA (MONDAY)",
    prabandhak_name: "REV. BHIM BOHARA JI (Mukhi)",
    contact_no: "9819513830",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-038",
    day: "MONDAY",
    branch: "THAKURLI",
    satsang_place: "THAKURLI (MONDAY)",
    prabandhak_name: "REV. KRISHNAKANT KAMBLI JI (Mukhi)",
    contact_no: "9820975293",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-039",
    day: "MONDAY",
    branch: "KALYAN",
    satsang_place: "PISAVALI (MONDAY)",
    prabandhak_name: "REV. USHA MALI JI",
    contact_no: "9892152920",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-040",
    day: "MONDAY",
    branch: "VITTHALWADI",
    satsang_place: "ANANDWADI KDMC SCHOOL (MONDAY)",
    prabandhak_name: "REV. SUNIL SHELAR JI",
    contact_no: "9320159587",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-041",
    day: "MONDAY",
    branch: "BADLAPUR",
    satsang_place: "VADAVLI (MONDAY)",
    prabandhak_name: "REV. KUNDLIK MHATRE JI",
    contact_no: "7875855491",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-042",
    day: "MONDAY",
    branch: "BADLAPUR",
    satsang_place: "KATRAP(MONDAY)",
    prabandhak_name: "REV. KASHINATH GAIKWAD JI",
    contact_no: "8007587666",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-043",
    day: "MONDAY",
    branch: "SAWARNE",
    satsang_place: "KARVELA (MONDAY)",
    prabandhak_name: "REV. RAGHUNATH KHAKAR JI (Mukhi)",
    contact_no: "7620015534",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-044",
    day: "MONDAY",
    branch: "BHIWANDI",
    satsang_place: "KONGAON SATSANG BHAWAN (MONDAY)",
    prabandhak_name: "REV. CHANDRAKANT DABHANE JI",
    contact_no: "9326232364",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-045",
    day: "MONDAY",
    branch: "BHIWANDI",
    satsang_place: "RAMNAGRI PAHADI (MONDAY)",
    prabandhak_name: "",
    contact_no: "",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-046",
    day: "MONDAY",
    branch: "BHIWANDI",
    satsang_place: "BHANODI GAON (MONDAY /3)",
    prabandhak_name: "REV. DURJAN GAIKWAD JI",
    contact_no: "9270883481",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-047",
    day: "MONDAY",
    branch: "BHIWANDI",
    satsang_place: "NARI SATSANG RANJNOLI BHAWAN (MONDAY / 1)",
    prabandhak_name: "REV. ASHA EKNATH BHAGAT JI",
    contact_no: "9545248474",
    time: "3.00 PM TO 5.00 PM"
  },

  // Page 3 - MONDAY & TUESDAY
  {
    id: "rec-048",
    day: "MONDAY",
    branch: "BRAHMANALI",
    satsang_place: "PAAYEGAON (MONDAY)",
    prabandhak_name: "REV. HARISHCHANDRA PATIL JI",
    contact_no: "9860312815",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-049",
    day: "MONDAY",
    branch: "GAYATRINAGAR",
    satsang_place: "GOVINDNAGAR (MONDAY)",
    prabandhak_name: "",
    contact_no: "",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-050",
    day: "TUESDAY",
    branch: "TITWALA",
    satsang_place: "MOHONE AMBIVALI EAST (TUESDAY)",
    prabandhak_name: "REV. VISHAL KOT JI",
    contact_no: "9920172289",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-051",
    day: "TUESDAY",
    branch: "TITWALA",
    satsang_place: "LAL BUNGLOW KHADAVALI EAST (TUESDAY)",
    prabandhak_name: "REV. K. K. DHADWAD JI",
    contact_no: "8652099532",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-052",
    day: "TUESDAY",
    branch: "VASIND",
    satsang_place: "NEVRE (TUESDAY)",
    prabandhak_name: "REV. ASHOK JADHAV JI",
    contact_no: "9834187477",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-053",
    day: "TUESDAY",
    branch: "BHISOL",
    satsang_place: "AAPTI (TUESDAY)",
    prabandhak_name: "REV. SASHIKANT SHISVE JI",
    contact_no: "9869634235",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-054",
    day: "TUESDAY",
    branch: "SHAHAPUR",
    satsang_place: "BORICHAPADA (TUESDAY)",
    prabandhak_name: "REV. SAKHARAM JADHAV JI",
    contact_no: "9226246543",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-055",
    day: "TUESDAY",
    branch: "SHAHAPUR",
    satsang_place: "ATGAON (TUESDAY)",
    prabandhak_name: "REV. VISHRAM VALAMBA JI",
    contact_no: "9273150800",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-056",
    day: "TUESDAY",
    branch: "KASARA",
    satsang_place: "VIHIGOAN (TUESDAY)",
    prabandhak_name: "REV. KASHIRAM TELAM JI",
    contact_no: "9307967231",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-057",
    day: "TUESDAY",
    branch: "ULHASNAGAR",
    satsang_place: "GOL MAIDAN SATSANG BHAWAN (TUESDAY)",
    prabandhak_name: "REV. DHARAMCHAND JI",
    contact_no: "9320272712",
    time: "6.00 PM TO 8.00 PM"
  },
  {
    id: "rec-058",
    day: "TUESDAY",
    branch: "AMBARNATH",
    satsang_place: "BHASKAR NAGAR SATSANG BHAWAN (TUESDAY)",
    prabandhak_name: "REV. EKNATH KAMBLE JI",
    contact_no: "9011904841",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-059",
    day: "TUESDAY",
    branch: "DWARLIPADA",
    satsang_place: "BHALGAON (TUESDAY)",
    prabandhak_name: "REV. VAMAN MHATRE JI",
    contact_no: "8652727979",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-060",
    day: "TUESDAY",
    branch: "DOMBIVLI",
    satsang_place: "DOMBIVLI SATSANG BHAWAN (TUESDAY)",
    prabandhak_name: "REV. CHANDRAKANT KANSE JI",
    contact_no: "9833590574",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-061",
    day: "TUESDAY",
    branch: "SONARPADA",
    satsang_place: "DAWADI (TUESDAY)",
    prabandhak_name: "REV. SANJAY GUPTA JI",
    contact_no: "9820815559",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-062",
    day: "TUESDAY",
    branch: "SONARPADA",
    satsang_place: "NARI SATSANG LODHA HEAVEN (TUESDAY 2/4)",
    prabandhak_name: "REV. KISHIN CHACHLANI JI",
    contact_no: "8655311861",
    time: "3.00 PM TO 5.00 PM"
  },
  {
    id: "rec-063",
    day: "TUESDAY",
    branch: "KALYAN",
    satsang_place: "TISGOAN (TUESDAY)",
    prabandhak_name: "REV. KARTIK SHARMA JI",
    contact_no: "9892935660",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-064",
    day: "TUESDAY",
    branch: "VITTHALWADI",
    satsang_place: "NARI SATSANG VITTHALWADI BHAWAN (TUESDAY)",
    prabandhak_name: "REV. BALABAI KHARAT JI",
    contact_no: "9260596836",
    time: "3.00 PM TO 5.00 PM"
  },
  {
    id: "rec-065",
    day: "TUESDAY",
    branch: "BADLAPUR",
    satsang_place: "VANGANI (TUESDAY)",
    prabandhak_name: "REV. GANESH KHADE JI",
    contact_no: "9881846743",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-066",
    day: "TUESDAY",
    branch: "BADLAPUR",
    satsang_place: "NARI SATSANG BADLAPUR BHAWAN (TUESDAY 2/4)",
    prabandhak_name: "REV. MADHAV PONDE JI (Mukhi)",
    contact_no: "9322296182",
    time: "3.00 PM TO 5.00 PM"
  },
  {
    id: "rec-067",
    day: "TUESDAY",
    branch: "SAWARNE",
    satsang_place: "SARALGAON (TUESDAY)",
    prabandhak_name: "REV. RAGHUNATH KHAKAR JI (Mukhi)",
    contact_no: "7620015534",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-068",
    day: "TUESDAY",
    branch: "BHIWANDI",
    satsang_place: "PIMPALNER (TUESDAY)",
    prabandhak_name: "REV. INDRABAL GAIKWAD JI",
    contact_no: "8805187999",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-069",
    day: "TUESDAY",
    branch: "BHIWANDI",
    satsang_place: "VALGAON (TUESDAY)",
    prabandhak_name: "REV. NITYANAND BHOIR JI",
    contact_no: "9823621361",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-070",
    day: "TUESDAY",
    branch: "BHIWANDI",
    satsang_place: "DEVJI NAGAR (TUESDAY)",
    prabandhak_name: "",
    contact_no: "",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-071",
    day: "TUESDAY",
    branch: "BHIWANDI",
    satsang_place: "NARI SATSANG BHIWANDI BHAWAN (TUESDAY)",
    prabandhak_name: "REV. RAVASAHEB HASBE JI",
    contact_no: "9869425283",
    time: "3.00 PM TO 5.00 PM"
  },

  // Page 4 - TUESDAY, WEDNESDAY & THURSDAY
  {
    id: "rec-072",
    day: "TUESDAY",
    branch: "GAYATRINAGAR",
    satsang_place: "NAGAON (TUESDAY)",
    prabandhak_name: "",
    contact_no: "",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-073",
    day: "WEDNESDAY",
    branch: "VASIND",
    satsang_place: "DIMBHA (WEDNESDAY)",
    prabandhak_name: "REV. ANANTA WAGH JI",
    contact_no: "9225103397",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-074",
    day: "WEDNESDAY",
    branch: "VASIND",
    satsang_place: "NARI SATSANG VASIND (2ND WEDNESDAY)",
    prabandhak_name: "REV. SUMAN KEKRE JI",
    contact_no: "9689692753",
    time: "3.00 PM TO 5.00 PM"
  },
  {
    id: "rec-075",
    day: "WEDNESDAY",
    branch: "BHISOL",
    satsang_place: "GHOTSAI SATSANG BHAWAN (WEDNESDAY)",
    prabandhak_name: "REV. RAJESH BHAGAT JI",
    contact_no: "9769334347",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-076",
    day: "WEDNESDAY",
    branch: "SHAHAPUR",
    satsang_place: "CHANDROTI (WEDNESDAY)",
    prabandhak_name: "REV. KATHOD MANJE JI",
    contact_no: "9271940430",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-077",
    day: "WEDNESDAY",
    branch: "SHAHAPUR",
    satsang_place: "PENDHARGHOL (WEDNESDAY)",
    prabandhak_name: "REV. GURUNATH SHINGAVE JI",
    contact_no: "9226118600",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-078",
    day: "WEDNESDAY",
    branch: "KASARA",
    satsang_place: "BORALA (WEDNESDAY)",
    prabandhak_name: "REV. GUNAJI GOWND JI",
    contact_no: "8767516945",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-079",
    day: "WEDNESDAY",
    branch: "AMBARNATH",
    satsang_place: "ROYAL PARK (WEDNESDAY)",
    prabandhak_name: "REV. T.N.PANDE JI",
    contact_no: "8411086987",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-080",
    day: "WEDNESDAY",
    branch: "GOGRASWADI",
    satsang_place: "GOGRASWADI (WEDNESDAY)",
    prabandhak_name: "REV. JAIDEV GAIKWAD JI",
    contact_no: "9773466580",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-081",
    day: "WEDNESDAY",
    branch: "SONARPADA",
    satsang_place: "ANTARLI (WEDNESDAY)",
    prabandhak_name: "REV. SUSHILA HAZARE JI",
    contact_no: "8169635380",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-082",
    day: "WEDNESDAY",
    branch: "THAKURLI",
    satsang_place: "SARASWATI HIGH SCHOOL (WEDNESDAY)",
    prabandhak_name: "REV. RAMESH MHATRE JI",
    contact_no: "9920228537",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-083",
    day: "WEDNESDAY",
    branch: "KALYAN",
    satsang_place: "KALYAN (WEDNESDAY)",
    prabandhak_name: "REV. JAGGANATH MHATRE JI (Sanyojak)",
    contact_no: "9769881962",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-084",
    day: "WEDNESDAY",
    branch: "VITTHALWADI",
    satsang_place: "VITTHALWADI SATSANG BHAWAN (WEDNESDAY)",
    prabandhak_name: "REV. PARMANAND VISHWAKARMA JI",
    contact_no: "8425010509",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-085",
    day: "WEDNESDAY",
    branch: "BADLAPUR",
    satsang_place: "BADLAPUR SATSANG BHAWAN (WEDNESDAY)",
    prabandhak_name: "REV. MADHAV PONDE JI (Mukhi)",
    contact_no: "9322296182",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-086",
    day: "WEDNESDAY",
    branch: "BHIWANDI",
    satsang_place: "PIMPALAS (WEDNESDAY)",
    prabandhak_name: "REV. NARESH BHOIR JI",
    contact_no: "8888574557",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-087",
    day: "WEDNESDAY",
    branch: "BHIWANDI",
    satsang_place: "GOVE NAKA (WEDNESDAY)",
    prabandhak_name: "REV. ASHOK BHOIR JI",
    contact_no: "9763149483",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-088",
    day: "WEDNESDAY",
    branch: "BHIWANDI",
    satsang_place: "KAMATGHAR (WEDNESDAY)",
    prabandhak_name: "REV. VINOD KANOJIYA",
    contact_no: "9860959605",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-089",
    day: "THURSDAY",
    branch: "TITWALA",
    satsang_place: "VIDYAMANDIR SCHOOL TITWALA EAST (THURSDAY)",
    prabandhak_name: "REV. KACHARU KHADE JI",
    contact_no: "9967512190",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-090",
    day: "THURSDAY",
    branch: "VASIND",
    satsang_place: "GAVITPADA (THURSDAY)",
    prabandhak_name: "REV. VISHNU SAHARE JI",
    contact_no: "9021208973",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-091",
    day: "THURSDAY",
    branch: "BHISOL",
    satsang_place: "KELNI (THURSDAY)",
    prabandhak_name: "REV. SHIVAJI BHOIR JI",
    contact_no: "7038545162",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-092",
    day: "THURSDAY",
    branch: "SHAHAPUR",
    satsang_place: "BENDAWAD TAMBADMAL PALASPADA (THURSDAY)",
    prabandhak_name: "REV. SIVRAM BHOYE JI",
    contact_no: "9325682734",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-093",
    day: "THURSDAY",
    branch: "KASARA",
    satsang_place: "KOTHALA (THURSDAY)",
    prabandhak_name: "REV. TULSHIRAM HEMA VEER JI",
    contact_no: "9764162651",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-094",
    day: "THURSDAY",
    branch: "KASARA",
    satsang_place: "NARI SATSANG KASARA BHAWAN (THURSDAY-1)",
    prabandhak_name: "REV. JIJABAI BALVANT KULAL JI",
    contact_no: "7276816427",
    time: "2.00 PM TO 4.00 PM"
  },
  {
    id: "rec-095",
    day: "THURSDAY",
    branch: "ULHASNAGAR",
    satsang_place: "KHEMANI ULHASNAGAR-2 (THURSDAY)",
    prabandhak_name: "REV. KAILASH SONAWANE JI",
    contact_no: "8010153180",
    time: "7.00 PM TO 9.00 PM"
  },

  // Page 5 - THURSDAY & FRIDAY
  {
    id: "rec-096",
    day: "THURSDAY",
    branch: "ULHASNAGAR",
    satsang_place: "NARI SATSANG GOL MAIDAN BHAWAN (THURSDAY)",
    prabandhak_name: "REV. MALA CHANGALANI JI",
    contact_no: "9323522450",
    time: "4.00 PM TO 5.30 PM"
  },
  {
    id: "rec-097",
    day: "THURSDAY",
    branch: "AMBARNATH",
    satsang_place: "BARKU PADA SATSANG BHAWAN (THURSDAY)",
    prabandhak_name: "REV. SANTARAM DABE JI",
    contact_no: "9552202891",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-098",
    day: "THURSDAY",
    branch: "AMBARNATH",
    satsang_place: "NARI SATSANG BHASKAR NAGAR BHAWAN (THURSDAY)",
    prabandhak_name: "REV. EKNATH KAMBALE JI",
    contact_no: "9011904841",
    time: "3.00 PM TO 5.00 PM"
  },
  {
    id: "rec-099",
    day: "THURSDAY",
    branch: "DWARLIPADA",
    satsang_place: "DHAMTAN (THURSDAY)",
    prabandhak_name: "REV. MAHESH MAURYA JI",
    contact_no: "8291526155",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-100",
    day: "THURSDAY",
    branch: "DOMBIVLI",
    satsang_place: "THAKURWADI (THURSDAY)",
    prabandhak_name: "REV. RAMESH TARAL JI",
    contact_no: "9082142177",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-101",
    day: "THURSDAY",
    branch: "GOGRASWADI",
    satsang_place: "NANDIVALI (THURSDAY)",
    prabandhak_name: "REV. MANOJ KODTE JI",
    contact_no: "9833098159",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-102",
    day: "THURSDAY",
    branch: "THAKURLI",
    satsang_place: "GOLAVLI SATSANG BHAWAN (THURSDAY)",
    prabandhak_name: "REV. DIGAMBAR GAIKWAD JI",
    contact_no: "8291224441",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-103",
    day: "THURSDAY",
    branch: "THAKURLI",
    satsang_place: "NARI SATSANG THAKURLI (THURSDAY 2/4)",
    prabandhak_name: "REV. SANGEETA JADHAV JI",
    contact_no: "9870328837",
    time: "3.00 PM TO 5.00 PM"
  },
  {
    id: "rec-104",
    day: "THURSDAY",
    branch: "KALYAN",
    satsang_place: "NANDIVALI SATSANG BHAWAN (THURSDAY)",
    prabandhak_name: "REV. TULSHIRAM DHONE JI",
    contact_no: "9920940043",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-105",
    day: "THURSDAY",
    branch: "KALYAN",
    satsang_place: "NARI SATSANG KALYAN (THURSDAY)",
    prabandhak_name: "REV. SUVARNA MHATRE JI",
    contact_no: "9769014048",
    time: "3.00 PM TO 5.00 PM"
  },
  {
    id: "rec-106",
    day: "THURSDAY",
    branch: "VITTHALWADI",
    satsang_place: "VITTHALWADI SATSANG BHAWAN (WEDNESDAY)",
    prabandhak_name: "REV. PARMANAND VISHWAKARMA JI",
    contact_no: "8425010509",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-107",
    day: "THURSDAY",
    branch: "BADLAPUR",
    satsang_place: "BENDSHIL (THURSDAY)",
    prabandhak_name: "REV. ROHIDAS PANDAY JI",
    contact_no: "9356865419",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-108",
    day: "THURSDAY",
    branch: "SAWARNE",
    satsang_place: "WALHIVARE (THURSDAY)",
    prabandhak_name: "REV. RAGHUNATH KHAKAR JI (Mukhi)",
    contact_no: "7620015534",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-109",
    day: "THURSDAY",
    branch: "BHIWANDI",
    satsang_place: "SARAVALI (THURSDAY)",
    prabandhak_name: "REV. CHANDRAHAS CHOUDHARY JI",
    contact_no: "8983496615",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-110",
    day: "THURSDAY",
    branch: "BRAHMANALI",
    satsang_place: "BRAHMANALI (THURSDAY)",
    prabandhak_name: "",
    contact_no: "",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-111",
    day: "THURSDAY",
    branch: "GAYATRINAGAR",
    satsang_place: "GAYATRINAGAR (THURSDAY)",
    prabandhak_name: "REV. ROHITLAL JI",
    contact_no: "7028386941",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-112",
    day: "FRIDAY",
    branch: "VASIND",
    satsang_place: "CHENDIVALI (FRIDAY)",
    prabandhak_name: "REV. VITTHAL VASAVLA JI",
    contact_no: "8080783457",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-113",
    day: "FRIDAY",
    branch: "BHISOL",
    satsang_place: "KAMBA SATSANG BHAWAN (FRIDAY)",
    prabandhak_name: "REV. JAYWANT BONKARI JI",
    contact_no: "8888491051",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-114",
    day: "FRIDAY",
    branch: "SHAHAPUR",
    satsang_place: "ASANGAON (FRIDAY)",
    prabandhak_name: "REV. TUKARAM MEMANE JI",
    contact_no: "9075405143",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-115",
    day: "FRIDAY",
    branch: "KASARA",
    satsang_place: "KHARADI (FRIDAY)",
    prabandhak_name: "REV. BALU MAHADU WAGH JI",
    contact_no: "9011992011",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-116",
    day: "FRIDAY",
    branch: "ULHASNAGAR",
    satsang_place: "GOL MAIDAN SATSANG BHAWAN (FRIDAY)",
    prabandhak_name: "REV. DHARAMCHAND JI",
    contact_no: "9320272712",
    time: "6.00 PM TO 8.00 PM"
  },
  {
    id: "rec-117",
    day: "FRIDAY",
    branch: "AMBARNATH",
    satsang_place: "BHASKAR NAGAR SATSANG BHAWAN (FRIDAY)",
    prabandhak_name: "REV. EKNATH KAMBLE JI",
    contact_no: "9011904841",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-118",
    day: "FRIDAY",
    branch: "AMBARNATH",
    satsang_place: "GAIKWAD PADA (FRIDAY)",
    prabandhak_name: "",
    contact_no: "9503777405",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-119",
    day: "FRIDAY",
    branch: "AMBARNATH",
    satsang_place: "NARI SATSANG ROYAL PARK (FRIDAY)",
    prabandhak_name: "REV. T.N.PANDE JI",
    contact_no: "8411086987",
    time: "3.00 PM TO 5.00 PM"
  },

  // Page 6 - FRIDAY & SATURDAY
  {
    id: "rec-120",
    day: "FRIDAY",
    branch: "DWARLIPADA",
    satsang_place: "DWARLIPADA SATSANG BHAWAN (FRIDAY)",
    prabandhak_name: "REV. SUNIL MHATRE JI",
    contact_no: "8689894825",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-121",
    day: "FRIDAY",
    branch: "DWARLIPADA",
    satsang_place: "NARI SATSANG MANERA GAON BHAWAN (FRIDAY 1/3)",
    prabandhak_name: "REV. CHANDAR JOSHI JI",
    contact_no: "7447883311",
    time: "3.00 PM TO 5.00 PM"
  },
  {
    id: "rec-122",
    day: "FRIDAY",
    branch: "DOMBIVLI",
    satsang_place: "DOMBIVLI SATSANG BHAWAN (FRIDAY)",
    prabandhak_name: "REV. CHANDRAKANT KANSE JI",
    contact_no: "9833590574",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-123",
    day: "FRIDAY",
    branch: "GOGRASWADI",
    satsang_place: "NARI SATSANG AYRE GAON (FRIDAY/1)",
    prabandhak_name: "REV. VINOD KENE JI",
    contact_no: "9821206650",
    time: "3.00 PM TO 5.00 PM"
  },
  {
    id: "rec-124",
    day: "FRIDAY",
    branch: "SONARPADA",
    satsang_place: "KOLEGAON (FRIDAY)",
    prabandhak_name: "REV. RAMASHANKAR DIXIT JI",
    contact_no: "9323651710",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-125",
    day: "FRIDAY",
    branch: "SONARPADA",
    satsang_place: "NARI SATSANG DAWADI (FRIDAY/3)",
    prabandhak_name: "REV. SANJAY GUPTA JI",
    contact_no: "9820815559",
    time: "3.00 PM TO 5.00 PM"
  },
  {
    id: "rec-126",
    day: "FRIDAY",
    branch: "KALYAN",
    satsang_place: "NETAJI NAGAR SATSANG BHAWAN (FRIDAY)",
    prabandhak_name: "REV. VIVEKANAND PANDEY JI",
    contact_no: "9082919558",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-127",
    day: "FRIDAY",
    branch: "KALYAN",
    satsang_place: "KACHORE SATSANG BHAWAN (FRIDAY)",
    prabandhak_name: "REV. R.F.CHAVHAN JI",
    contact_no: "9967614282",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-128",
    day: "FRIDAY",
    branch: "VITTHALWADI",
    satsang_place: "KHADEGOLVALI JANSEWA SCHOOL (FRIDAY)",
    prabandhak_name: "REV. RAMNARAYAN PAL JI",
    contact_no: "9322036134",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-129",
    day: "FRIDAY",
    branch: "BADLAPUR",
    satsang_place: "SHIRGAON (FRIDAY)",
    prabandhak_name: "REV. CHANDRAKANT PATIL JI",
    contact_no: "9834939257",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-130",
    day: "FRIDAY",
    branch: "SAWARNE",
    satsang_place: "MURBAD (FRIDAY)",
    prabandhak_name: "REV. RAGHUNATH KHAKAR JI (Mukhi)",
    contact_no: "7620015534",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-131",
    day: "FRIDAY",
    branch: "BHIWANDI",
    satsang_place: "BHIWANDI SATSANG BHAWAN (FRIDAY)",
    prabandhak_name: "REV. RAVASAHEB HASBE JI",
    contact_no: "9869425283",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-132",
    day: "FRIDAY",
    branch: "BHIWANDI",
    satsang_place: "NARI SATSANG KONGAON SATSANG BHAWAN (FRIDAY)",
    prabandhak_name: "REV. CHANDRAKANT DABHANE JI",
    contact_no: "9326232364",
    time: "3.00 PM TO 5.00 PM"
  },
  {
    id: "rec-133",
    day: "SATURDAY",
    branch: "TITWALA",
    satsang_place: "JANKI VIDYALAYA TITWALA WEST (SATURDAY)",
    prabandhak_name: "REV. BANDU BHANGARE JI",
    contact_no: "8898501598",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-134",
    day: "SATURDAY",
    branch: "VASIND",
    satsang_place: "BHUEISHET (SATURDAY)",
    prabandhak_name: "REV. VAMAN JI",
    contact_no: "7448124742",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-135",
    day: "SATURDAY",
    branch: "BHISOL",
    satsang_place: "BAPSAI (SATURDAY)",
    prabandhak_name: "REV. SHANTARAM TEMBHE JI",
    contact_no: "8369793565",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-136",
    day: "SATURDAY",
    branch: "BHISOL",
    satsang_place: "MHARAL (SATURDAY)",
    prabandhak_name: "REV. KANTARAM GODAMBE JI",
    contact_no: "9220316178",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-137",
    day: "SATURDAY",
    branch: "SHAHAPUR",
    satsang_place: "GANESHWADI (SATURDAY)",
    prabandhak_name: "REV. CHANDRABHAGA KULAL JI",
    contact_no: "7798206142",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-138",
    day: "SATURDAY",
    branch: "SHAHAPUR",
    satsang_place: "ARJUNALI (SATURDAY)",
    prabandhak_name: "REV. RAGHUNATH BHOIR JI",
    contact_no: "8308293663",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-139",
    day: "SATURDAY",
    branch: "SHAHAPUR",
    satsang_place: "NARI SATSANG SHAHAPUR SATSANG BHAWAN (SATURDAY 2/4)",
    prabandhak_name: "REV. SUVARNA SHIVDE JI",
    contact_no: "8830654594",
    time: "3.00 PM TO 5.00 PM"
  },
  {
    id: "rec-140",
    day: "SATURDAY",
    branch: "SHAHAPUR",
    satsang_place: "MOBILE NARI SATSANG SHAHAPUR (SATURDAY 1/3)",
    prabandhak_name: "REV. SUVARNA SHIVDE JI",
    contact_no: "8830654594",
    time: "3.00 PM TO 5.00 PM"
  },
  {
    id: "rec-141",
    day: "SATURDAY",
    branch: "KASARA",
    satsang_place: "CHILARWADI (SATURDAY)",
    prabandhak_name: "REV. SHANKAR CHAHU BHAGAT JI",
    contact_no: "9284798614",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-142",
    day: "SATURDAY",
    branch: "ULHASNAGAR",
    satsang_place: "NARI SATSANG DOODHNAKA BHAWAN (SATURDAY)",
    prabandhak_name: "REV. MALA CHANGALANI JI",
    contact_no: "9323522450",
    time: "4.00 PM TO 5.30 PM"
  },
  {
    id: "rec-143",
    day: "SATURDAY",
    branch: "AMBARNATH",
    satsang_place: "LOKNAGARI (SATURDAY)",
    prabandhak_name: "REV. NAMDEV PATIL JI",
    contact_no: "7262883152",
    time: "7.00 PM TO 9.00 PM"
  },

  // Page 7 - SATURDAY
  {
    id: "rec-144",
    day: "SATURDAY",
    branch: "DWARLIPADA",
    satsang_place: "ASHELE PADA ULHASNAGAR-4 (SATURDAY)",
    prabandhak_name: "REV. SHIVAJI TARE JI",
    contact_no: "9767060187",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-145",
    day: "SATURDAY",
    branch: "DWARLIPADA",
    satsang_place: "BURDUL SATSANG BHAWAN (SATURDAY)",
    prabandhak_name: "REV. VILAS PATIL JI",
    contact_no: "9220306918",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-146",
    day: "SATURDAY",
    branch: "DWARLIPADA",
    satsang_place: "NARI SATSANG DWARLIPADA BHAWAN (SATURDAY 2/4)",
    prabandhak_name: "REV. ALKA MHATRE JI",
    contact_no: "9372578089",
    time: "3.00 PM TO 5.00 PM"
  },
  {
    id: "rec-147",
    day: "SATURDAY",
    branch: "DOMBIVLI",
    satsang_place: "KOPAR (SATURDAY)",
    prabandhak_name: "REV. DEEPAK MHATRE JI",
    contact_no: "9619610159",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-148",
    day: "SATURDAY",
    branch: "DOMBIVLI",
    satsang_place: "NARI SATSANG DOMBIVLI BHAWAN (SATURDAY/2)",
    prabandhak_name: "REV. CHANDRAKANT KANSE JI",
    contact_no: "9833590574",
    time: "3.00 PM TO 5.00 PM"
  },
  {
    id: "rec-149",
    day: "SATURDAY",
    branch: "DOMBIVLI",
    satsang_place: "NARI SATSANG GAONDEVI (SATURDAY 1/4)",
    prabandhak_name: "REV. VINANTI SAKHALKAR JI",
    contact_no: "9594914606",
    time: "3.00 PM TO 5.00 PM"
  },
  {
    id: "rec-150",
    day: "SATURDAY",
    branch: "DOMBIVLI",
    satsang_place: "NARI SATSANG THAKURWADI (SATURDAY/3)",
    prabandhak_name: "REV. RAMESH TARAL JI",
    contact_no: "9082142177",
    time: "3.00 PM TO 5.00 PM"
  },
  {
    id: "rec-151",
    day: "SATURDAY",
    branch: "GOGRASWADI",
    satsang_place: "SAHAGAON (SATURDAY)",
    prabandhak_name: "REV. ANANT MHATRE JI",
    contact_no: "8291239023",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-152",
    day: "SATURDAY",
    branch: "GOGRASWADI",
    satsang_place: "NARI SATSANG NANDIVALI (SATURDAY/3)",
    prabandhak_name: "REV. MANOJ KODTE JI",
    contact_no: "9833098159",
    time: "3.00 PM TO 5.00 PM"
  },
  {
    id: "rec-153",
    day: "SATURDAY",
    branch: "SONARPADA",
    satsang_place: "NARI SATSANG KOLEGAON (SATURDAY/4)",
    prabandhak_name: "REV. RAMASHANKAR DIXIT JI",
    contact_no: "9323651710",
    time: "3.00 PM TO 5.00 PM"
  },
  {
    id: "rec-154",
    day: "SATURDAY",
    branch: "THAKURLI",
    satsang_place: "NARI SATSANG GOLAVLI (SATURDAY / 1)",
    prabandhak_name: "REV. SANGEETA JADHAV JI",
    contact_no: "9870328837",
    time: "3.00 PM TO 5.00 PM"
  },
  {
    id: "rec-155",
    day: "SATURDAY",
    branch: "KALYAN",
    satsang_place: "NETIVALI (SATURDAY)",
    prabandhak_name: "REV. R.F.CHAVHAN JI",
    contact_no: "9967614282",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-156",
    day: "SATURDAY",
    branch: "KALYAN",
    satsang_place: "MILIND NAGAR (SATURDAY)",
    prabandhak_name: "REV. KESHAV PATIL JI",
    contact_no: "9769590982",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-157",
    day: "SATURDAY",
    branch: "BADLAPUR",
    satsang_place: "KANHOR (SATURDAY)",
    prabandhak_name: "REV. RAMESH DESHMUKH JI",
    contact_no: "9833930688",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-158",
    day: "SATURDAY",
    branch: "SAWARNE",
    satsang_place: "GODYACHAPADA (SATURDAY)",
    prabandhak_name: "REV. RAGHUNATH KHAKAR JI (Mukhi)",
    contact_no: "7620015534",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-159",
    day: "SATURDAY",
    branch: "BHIWANDI",
    satsang_place: "RANJNOLI SATSANG BHAWAN (SATURDAY)",
    prabandhak_name: "REV. ASHA EKNATH BHAGAT JI",
    contact_no: "9545248474",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-160",
    day: "SATURDAY",
    branch: "BHIWANDI",
    satsang_place: "GOVA NAKA (SATURDAY)",
    prabandhak_name: "REV. CHANDRAHAS CHOUDHARY JI",
    contact_no: "8983496615",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-161",
    day: "SATURDAY",
    branch: "BHIWANDI",
    satsang_place: "SARANG GAON (SATURDAY)",
    prabandhak_name: "REV. HANUMAN PATIL",
    contact_no: "8308678363",
    time: "7.00 PM TO 9.00 PM"
  },
  {
    id: "rec-162",
    day: "SATURDAY",
    branch: "BHIWANDI",
    satsang_place: "NARI SATSANG PIMPALAS (SATURDAY / 2)",
    prabandhak_name: "REV. NARESH BHOIR JI",
    contact_no: "8888574557",
    time: "3.00 PM TO 5.00 PM"
  },
  {
    id: "rec-163",
    day: "SATURDAY",
    branch: "BRAHMANALI",
    satsang_place: "DUGADPHATA (SATURDAY)",
    prabandhak_name: "REV. MITHARAM PATIL JI",
    contact_no: "9309363534",
    time: "6.00 PM TO 8.00 PM"
  },
  {
    id: "rec-164",
    day: "SATURDAY",
    branch: "BRAHMANALI",
    satsang_place: "SANGAMPADA (SATURDAY)",
    prabandhak_name: "REV. RATNESH JI",
    contact_no: "9325326081",
    time: "7.00 PM TO 9.00 PM"
  }
];

export const UNIQUE_BRANCHES: string[] = Array.from(
  new Set(INITIAL_SATSANG_RECORDS.map(r => r.branch))
).sort();

export const DAYS_LIST: DayOfWeek[] = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY'
];

export function mapDayIndexToDayOfWeek(dayIndex: number): DayOfWeek {
  const map: Record<number, DayOfWeek> = {
    0: 'SUNDAY',
    1: 'MONDAY',
    2: 'TUESDAY',
    3: 'WEDNESDAY',
    4: 'THURSDAY',
    5: 'FRIDAY',
    6: 'SATURDAY',
  };
  return map[dayIndex] || 'SUNDAY';
}

