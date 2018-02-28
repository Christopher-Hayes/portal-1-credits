var lyrics, cursor, credits;
var start;
function onload() {
    lyrics = document.getElementById( "lyrics" );
    credits = document.getElementById( "credits" );
    initCursor();
    var audio = document.getElementById( "music" );
    audio.addEventListener( 'canplay', start, false );
    if (audio.readyState > 3)
        start();
}
// start when music is loaded
function start() {
    document.getElementById( "music" ).play();
    start = ( new Date() ).getTime();
    initLyrics();
    initCredits();
    initImages();
    setTimeout( function() { document.getElementById( "thanks" ).style.visibility = "visible"; }, 175000 );
}
/* LYRICS */
var lyricsIndex = 0;
function initLyrics() {
    start = ( new Date() ).getTime();
    for( var k in text )
        printLyric( text[ k ][ 0 ], text[ k ][ 2 ], Math.max( 0, text[ k ][ 1 ] ) - 1500, k );
}
function printLyric( text, duration, delay, index ) {
    if( delay > 0 ) {
        setTimeout( function() { printLyric( text, duration, 0, index ) }, delay );
    }else {
        if( lyricsIndex != index ) {
            setTimeout( function() { printLyric( text, duration, 0, index ); }, 5 );
        }else {
            if( text == "CLEAR" ) {
                clearScr();
                lyricsIndex++;
            }else if( text == "BREAK" ) {
                lyrics.insertBefore( document.createElement( "br" ), cursor );
                lyricsIndex++;
            }else {
                loopThrough( text, duration / text.length );
            }
        }
    }
}
function loopThrough( textLeft, sleep ) {
    var newChar = document.createElement( "span" );
    newChar.classList.add( "printChar" );
    newChar.innerHTML = textLeft.charAt( 0 );
    newChar.style.animationPlayState = "running";
    lyrics.insertBefore( newChar, cursor );
    if( textLeft.length > 1 ) {
        setTimeout( function() { loopThrough( textLeft.substr( 1 ), sleep ) }, sleep );
    }else {
        lyrics.insertBefore( document.createElement( "br" ), cursor );
        lyricsIndex++;
    }
}
function clearScr() {
    lyrics.innerHTML = "";
    initCursor();
}
function initCursor() {
    cursor = document.createElement( "div" );
    cursor.classList.add( "cursor" );
    cursor.innerHTML = "_";
    lyrics.appendChild( cursor );
}
/* CREDITS */
var creditsIndex = 0;
function initCredits() {
    var t = 0;
    for( var k in creditsText ) {
        var len = creditsText[ k ] == "" ? 50 : 950;
        printCredits( creditsText[ k ], len, t, k );
        t += len;
    }
}
function printCredits( text, duration, delay, index ) {
    if( delay > 0 ) {
        setTimeout( function() { printCredits( text, duration, 0, index ) }, delay );
    }else {
        if( creditsIndex != index )
            setTimeout( function() { printCredits( text, duration, 0, index ) }, 5 );
        else
            loopThroughCredits( text, duration / text.length );
    }
}
function loopThroughCredits( textLeft, sleep ) {
    var newChar = document.createElement( "span" );
    newChar.classList.add( "printChar" );
    newChar.innerHTML = textLeft.charAt( 0 );
    newChar.style.animationPlayState = "running";
    credits.append( newChar );
    if( textLeft.length > 1 ) {
        setTimeout( function() { loopThroughCredits( textLeft.substr( 1 ), sleep ) }, sleep );
    }else {
        credits.append( document.createElement( "br" ) );
        creditsIndex++;
    }
}
function initImages() {
    for( var k = 0; k < images.length; k += 2 )
        setTimeout( function() { setImage( this.k ); }.bind( {k: images[ k ]} ), images[ k + 1 ] - 1500 );
}
function setImage( index ) {
    var imgs = document.getElementsByClassName( "graphic" );
    for( var k of imgs )
        k.style.display = "none";
    imgs[ index ].style.display = "block";
}
/* TIMEPOINT TOOL 
var index = 0, timer = -1;
window.onkeydown = function( e ) {
    var now = ( new Date() ).getTime();
    if( e.keyCode == 88 && timer == -1) {
        // X key; pressed at beginning of lyric sentence
        timer = now;
        // skip BREAK and CLEAR timepoints
        while( text[ index ][ 0 ] == "BREAK" || text[ index ][ 0 ] == "CLEAR" ) index++;
        text[ index ][ 1 ] = now - start;
    }else if( e.keyCode == 90 && timer != -1 ) {
        // Z key; pressed at ending of lyric sentence
        text[ index ][ 2 ] = now - timer;
        index++;
        timer = -1;
    }else if( e.keyCode == 80 ) {
        // P key; print array to be pasted into js code
        printLyricArray();
    }
}
function printLyricArray() {
    for( var k of text ) {
        console.log( "\t[ \"" + k[ 0 ] + "\", " + k[ 1 ].toString() + ", " + k[ 2 ].toString() + " ],")
    }
}*/
// images
var images = [
// INDEX, TMEPOINT
     0,  19200,    // Aperture Science
     1,  31600,    // Radioactive
     0,  33800,    // Aperture Science
     2,  41700,    // Science
     0,  45600,    // Aperture Science
     3,  65400,    // Broken Heart
     7,  71000,    // Destruction
     4,  77000,    // Fire
     5,  83700,    // Checkmark
     7,  94000,    // Destruction
     2,  95500,    // Science
     0,  97700,    // Aperture Science
     6, 123500,    // Black Mesa
     8, 132500,    // Cake
     9, 137800,    // GlaDOS
     1, 139600,    // Radioactive
     0, 141700,    // Aperture Science
     2, 145800,    // Science
     7, 147700,    // Destruction
     0, 149800     // Aperture Science
];
// lyrics
var text = [
    // TEXT, TIME POINT, DURATION
    [ "Forms FORM-29827281-12:", 1500, 700 ],
 	[ "Test Assessment Report", 2200, 700 ],
 	[ "BREAK", 2900, 0 ],
 	[ "BREAK", 2910, 0 ],
 	[ "This was a triumph.", 3235, 1309 ],
 	[ "I'm making a note here:", 7100, 1443 ],
 	[ "HUGE SUCCESS", 9132, 1443 ],
 	[ "It's hard to overstate", 12000, 2000 ],
 	[ "my satisfaction.", 14300, 2400 ],
 	[ "Aperture Science", 19243, 1648 ],
 	[ "We do what we must", 23031, 1220 ],
 	[ "because we can.", 24523, 1816 ],
 	[ "For the good of all of us.", 28214, 2576 ],
 	[ "Except the ones who are dead.", 31610, 1696 ],
 	[ "BREAK", 33500, 0 ],
 	[ "But there's no sense crying", 33827, 1651 ],
 	[ "over every mistake.", 35786, 1560 ],
 	[ "You just keep on trying", 37675, 1407 ],
 	[ "till you run out of cake.", 39458, 1672 ],
 	[ "And the science gets done.", 41734, 1560 ],
 	[ "And you make a neat gun.", 43827, 1479 ],
 	[ "For the people who are", 45666, 1424 ],
 	[ "still alive.", 47200, 1908 ],
 	[ "CLEAR", 49500, 0 ],
    [ "Forms FORM-55551-5:", 50000, 500 ],
    [ "Personnel File Addendum:", 50600, 500 ],
    [ "BREAK", 51400, 0 ],
    [ "Dear <<Subject Name Here>>,", 51500, 1000 ],
    [ "BREAK", 52700, 0 ],
 	[ "I'm not even angry.", 55038, 1884 ],
 	[ "I'm being so sincere right now.", 59034, 2732 ],
 	[ "Even though you broke my heart.", 64434, 2500 ],
 	[ "And killed me.", 67665, 1713 ],
 	[ "BREAK", 69500, 0 ],
 	[ "And tore me to pieces.", 70978, 1732 ],
 	[ "And threw every piece into a fire.", 74874, 3039 ],
 	[ "As they burned it hurt because", 80338, 2532 ],
 	[ "I was so happy for you!", 83721, 940 ],
 	[ "BREAK", 84800, 0 ],
 	[ "Now these points of data", 85802, 1350 ],
 	[ "make a beautiful line.", 87249, 1908 ],
 	[ "And we're out of beta.", 89842, 1487 ],
 	[ "We're releasing on time.", 91529, 1616 ],
 	[ "So I'm GLaD. I got burned!", 93800, 1375 ],
 	[ "Think of all the things we learned", 95550, 1687 ],
 	[ "for the people who are", 97737, 1529 ],
 	[ "still alive.", 99577, 1604 ],
 	[ "CLEAR", 101500, 0 ],
    [ "Forms FORM-55551-5:", 101800, 1000 ],
    [ "Personnel File Addendum:", 103000, 1000 ],
    [ "BREAK", 104200, 0 ],
    [ "One last thing:", 106000, 1000 ],
    [ "BREAK", 107200, 0 ],
 	[ "Go ahead and leave me.", 107403, 1576 ],
 	[ "I think I'd prefer to stay inside.", 111001, 3100 ],
 	[ "Maybe you'll find someone else", 116349, 2500 ],
 	[ "to help you.", 119569, 1633 ],
 	[ "Maybe Black Mesa...", 123161, 1784 ],
 	[ "THAT WAS A JOKE. FAT CHANCE.", 127049, 2744 ],
 	[ "Anyway, this cake is great.", 131950, 2700 ],
 	[ "It's so delicious and moist.", 135761, 1632 ],
 	[ "Look at me still talking", 137873, 1368 ],
 	[ "when there's science to do.", 139609, 1700 ],
 	[ "When I look out there,", 141729, 1352 ],
 	[ "it makes me GLaD I'm not you.", 143549, 1544 ],
 	[ "I've experiments to run.", 145817, 1385 ],
 	[ "There is research to be done.", 147713, 1576 ],
 	[ "On the people who are", 149822, 1356 ],
 	[ "still alive.", 151562, 1196 ],
    [ "CLEAR", 152900, 0 ],
 	[ "PS: And believe me I am", 153738, 1320 ],
 	[ "still alive.", 155242, 1200 ],
 	[ "PPS: I'm doing science and I'm", 157626, 1483 ],
 	[ "still alive.", 159210, 1200 ],
 	[ "PPPS: I feel FANTASTIC and I'm", 161306, 1300 ],
 	[ "still alive.", 162800, 1200 ],
    [ "BREAK", 164200, 0 ],
    [ "FINAL THOUGHT:", 164300, 1 ],
 	[ "While you're dying I'll be", 165514, 1184 ],
 	[ "still alive.", 167550, 1200 ],
    [ "BREAK", 168800, 0 ],
    [ "FINAL THOUGHT PS:", 169000, 1 ],
 	[ "And when you're dead I will be", 169593, 1588 ],
 	[ "still alive", 171202, 1200 ],
 	[ "BREAK", 172500, 0 ],
 	[ "BREAK", 172600, 0 ],
 	[ "STILL ALIVE", 172875, 1200 ],
 	[ "CLEAR", 175000, 0 ]
];
// credits
var creditsText = [
    ">LIST PERSONNEL",
    "",
    "",
    "Gautam babbar",
    "Ted Backman",
    "Kelly Bailey",
    "Jeff Ballinger",
    "Aaron Barber",
    "Jeep Barnett",
    "Jeremy Bennett",
    "Dan Berger",
    "Yahn Bernier",
    "Ken Birdwell",
    "Derrick Birum",
    "Mike Blazszak",
    "Iestyn Bleasdale-Shepherd",
    "Chris Bohitch",
    "Steve Bond",
    "Matt Boone",
    "Antoine Bourdon",
    "Jamaal Bradley",
    "Jason Brashill",
    "Charlie Brown",
    "Charlie Burgin",
    "Andrew Burke",
    "Augusta Butlin",
    "Julie Caldwell",
    "Dario Casali",
    "Chris Chin",
    "Jess Cliffe",
    "Phil Co",
    "John Cook",
    "Christen Coomer",
    "Greg Coomer",
    "Scott Dalton",
    "Kerry Davis",
    "Jason Deakins",
    "Joe Demers",
    "Ariel Diaz",
    "Quintin Doroquez",
    "Jim Dose",
    "Chris Douglass",
    "Laura Dubuk",
    "Mike Dunkle",
    "Mike Durand",
    "Mike Dussault",
    "Dhabih Eng",
    "Katie Engel",
    "Chet Faliszak",
    "Adrian Finol",
    "Bill Fletcher",
    "Moby Francke",
    "Stephane Gaudette",
    "Kathy Gehrig",
    "Vitaliy Genkin",
    "Paul Graham",
    "Chris Green",
    "Chris Grinstead",
    "John Guthrie",
    "Aaron Halifax",
    "Reagan Halifax",
    "Leslie Hall",
    "Jeff Hameluck",
    "Joe Han",
    "Don Holden",
    "Jason Holtman",
    "Gray Horsfield",
    "Keith Huggins",
    "Jim Hughes",
    "Jon Huisingh",
    "Brian Jacobson",
    "Lars Jensvold",
    "Erik Johnson",
    "Jakob Jungels",
    "Rich Kaethler",
    "Steve Kalning",
    "Aaron Kearly",
    "Iikka Keranen",
    "David Kircher",
    "Eric Kirchmer",
    "Scott Klintworth",
    "Alden Kroll",
    "Marc Laidlaw",
    "Jeff Lane",
    "Tim Larkin",
    "Dan LeFree",
    "Isabelle LeMay",
    "Tom Leonard",
    "Jeff Lind",
    "Doug Lombardi",
    "Bianca Loomis",
    "Richard Lord",
    "Realm Lovejoy",
    "Randy Lundeen",
    "Scott Lynch",
    "Ido Magal",
    "Nick Maggiore",
    "John McCaskey",
    "Patrick McClard",
    "Steve McClure",
    "Hamish McKenzie",
    "Gary McTaggart",
    "Jason Mitchell",
    "Mike Morasky",
    "John Morello II",
    "Bryn Moslow",
    "Arsenio Navarro",
    "Gabe Newell",
    "Milton Ngan",
    "Jake Nicholson",
    "Martin Otten",
    "Nick Papineau",
    "Karen Prell",
    "Bay Raitt",
    "Tristan Reidford",
    "Alfred Reynolds",
    "Matt Rhoten",
    "Garret Rickey",
    "Dave Riller",
    "Elan Ruskin",
    "Matthew Russell",
    "Jason Ruymen",
    "David Sawyer",
    "Marc Scaparro",
    "Wade Schin",
    "Matthew Scott",
    "Aaron Seeler",
    "Jennifer Seeley",
    "Taylor Sherman",
    "Eric Smith",
    "Jeff Sorenson",
    "David Speyrer",
    "Jay Stelly",
    "Jeremy Stone",
    "Eric Strand",
    "Kim Swift",
    "Kelly Thornton",
    "Eric Twelker",
    "Carl Uhlman",
    "Doug Valente",
    "Bill Van Buren",
    "Gabe Van Engel",
    "Alex Vlachos",
    "Robin Walker",
    "Joshua Weier",
    "Andrea Wicklund",
    "Greg Winkler",
    "Erik Wolpaw",
    "Doug Wood",
    "Matt T. Wood",
    "Danika Wright",
    "Matt Wright",
    "Shawn Zabecki",
    "Torsten Sabka",
    "",
    "",
    "",
    "'Still Alive' by:",
    "Jonathan Coulon",
    "",
    "",
    "Voice:",
    "Ellen McLain - GlaDOS, Turrets",
    "Mike Patton - THE ANGER SPHERE",
    "",
    "",
    "Voice Casting:",
    "Shana Landsburg\Teri Fiddleman",
    "",
    "",
    "Voice Recording:",
    "Pure Audio, Seattle, WA",
    "",
    "",
    "Voice recording",
    "scheduling and logistics:",
    "Pat Cockburn, Pure Audio",
    "",
    "",
    "Translations:",
    "SDL",
    "",
    "",
    "Crack Legal Team:",
    "Liam Lavery",
    "Karl Quackenbush",
    "Kristen Boraas",
    "Kevin Rosenfield",
    "Alan Bruggeman",
    "Dennis Tessier",
    "",
    "",
    "Thanks for the user of their face:",
    "ALesia Glidewell - Chell",
    "",
    "",
    "Special thanks to everyone at:",
    "Alienware",
    "ATI",
    "Dell",
    "Falcon Northwest",
    "Havok",
    "SOFTIMAGE",
    "and Don Demmis, SLK Technologies",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "THANK YOU FOR PARTICIPATING",
    "IN THIS",
    "ENRICHMENT CENTER ACTIVITY!!",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];