from random import choice as rc, randrange

from app import app
from models import db, User, Hobby, UserHobby, Competition, Result, Entry

from random import randint, choice as rc
import pandas as pd

if __name__ == '__main__':
    with app.app_context():
        #Clear dbs
        print("Clearing db...")
        User.query.delete()
        Hobby.query.delete()
        Competition.query.delete()
        Result.query.delete()
        Entry.query.delete()
#------------------------------------------------------------------------------------------USER SEEDING---------------------------------------------------------------------------------------
        #Seed users
        print("Seeding potential Users...")
        users = [
            User(
            firstName="Luna",
            lastName="Everwood",
            username="EnchantingLuna88",
            age=28,
            bio="Hey there! I'm Luna, a nature enthusiast, artist, and dreamer. I find so much inspiration in the breathtaking beauty of national parks that I try to capture through my vibrant paintings. My art aims to evoke a sense of tranquility and wonder, reflecting my deep connection with nature. Exploring the world's natural wonders has become a life-changing journey that keeps me endlessly curious.",
            location="Aspen, Colorado, USA",
            phone="+1 (970) 789-1234",
            email="luna.paints.magic88@gmail.com",
            profileImg="link_to_profile_image_1",
            bannerImg="link_to_banner_image_1",
            ),
            User(
            firstName="Zephyr",
            lastName="Wilde",
            username="WandererZephyr_42",
            age=35,
            bio="Greetings, everyone! I'm Zephyr, an adventurer and storyteller with an insatiable curiosity for unraveling mysteries. My thrilling journeys take me to the far reaches of our country, where I document forgotten tales and weave them into captivating narratives that leave my readers in awe. With my trusty journal and an explorer's spirit, I roam the wilderness, seeking untold stories and adventures that ignite the imagination.",
            location="Mystic Falls, Vermont, USA",
            phone="+1 (802) 456-7890",
            email="zephyr.explores42@gmail.com",
            profileImg="link_to_profile_image_2",
            bannerImg="link_to_banner_image_2",
            ),
            User(
            firstName="Seren",
            lastName="Hawthorne",
            username="melodic_scribe_22",
            age=22,
            bio="Hello, lovely people! I'm Seren, a music lover, tea enthusiast, and aspiring writer. My days are filled with the soul-stirring melodies of my own composition and heartfelt ballads that express emotions words can't capture. Armed with a pen and my favorite chamomile tea, I'm on a journey to craft my first novel and share my unique voice with the world. Embracing the magic of storytelling and music, I hope to touch hearts and inspire others.",
            location="Melodyville, Tennessee, USA",
            phone="+1 (615) 234-5678",
            email="seren.hawthorne.scribe@gmail.com",
            profileImg="link_to_profile_image_3",
            bannerImg="link_to_banner_image_3",
            ),
            User(
            firstName="Atlas",
            lastName="Stone",
            username="mountainseeker_atlas",
            age=42,
            bio="Hey! I'm Atlas, an explorer and adrenaline junkie. My life revolves around conquering mountains, both literal and metaphorical, as I strive to inspire others to embrace an active and adventurous lifestyle. My passion lies in guiding people towards unforgettable experiences and empowering them to lead fulfilling lives. Exploring the world and helping others discover their potential keeps me energized and grateful every day.",
            location="Summitville, California, USA",
            phone="+1 (530) 987-6543",
            email="atlas.stone_explores42@gmail.com",
            profileImg="link_to_profile_image_4",
            bannerImg="link_to_banner_image_4",
            ),
            User(
            firstName="Aria",
            lastName="Nightingale",
            username="Harmonic_Aria31",
            age=31,
            bio="Hello, wonderful souls! I'm Aria, a classical musician and opera aficionado. My deepest passion is to enchant audiences with soul-stirring performances in grand theaters. The stage becomes my canvas, where I paint emotions with every note I sing. Through my art, I hope to touch hearts and connect with the shared human experience. Join me on this musical journey that transcends boundaries and brings harmony to our lives.",
            location="Harmonyville, New York, USA",
            phone="+1 (518) 765-4321",
            email="Aria.Harmonic31@gmail.com",
            profileImg="link_to_profile_image_5",
            bannerImg="link_to_banner_image_5",
            ),
            User(
            firstName="Max",
            lastName="Adler",
            username="CosmicMax46",
            age=46,
            bio="Greetings, stargazers! I'm Max, an amateur astronomer and space enthusiast. The night sky has always held a special place in my heart, and I find immense joy in gazing at the wonders of the cosmos. Armed with my telescope, I explore the universe from my backyard observatory, marveling at the beauty and vastness of the stars. Join me on this cosmic journey as we uncover the mysteries of the universe together.",
            location="Starlight City, Arizona, USA",
            phone="+1 (602) 111-2222",
            email="Max.Cosmic46@gmail.com",
            profileImg="link_to_profile_image_6",
            bannerImg="link_to_banner_image_6",
            ),
            User(
            firstName="Eliza",
            lastName="Bard",
            username="InkWanderlust",
            age=25,
            bio="Hello, fellow bookworms! I'm Eliza, and I absolutely adore losing myself in the enchanting world of literature. Imagination and adventure await within the pages of each book I dive into. Armed with my favorite novels, I embark on literary journeys through enchanted lands and epic tales. Join me on these captivating adventures as we explore the magic and wonder that words can weave.",
            location="Enchanted Hollow, Massachusetts, USA",
            phone="+1 (508) 481-6234",
            email="eliza.inkwander25@gmail.com",
            profileImg="link_to_profile_image_7",
            bannerImg="link_to_banner_image_7",
            ),
            User(
            firstName="Phoenix",
            lastName="Blaze",
            username="FieryEntertainer_53",
            age=53,
            bio="Greetings, fellow thrill-seekers! I'm Phoenix, a fire performer and adrenaline junkie. My passion lies in mesmerizing audiences with daring fire dancing shows that leave everyone breathless. Embracing the thrill of the flames, I've found a profound connection with the elements and the liberating feeling of transcending fear. Join me on this fiery journey as we embrace the heat and explore the beauty that lies within the flames.",
            location="Emberbrook, Texas, USA",
            phone="+1 (512) 820-5630",
            email="Phoenix.Fiery53@gmail.com",
            profileImg="link_to_profile_image_8",
            bannerImg="link_to_banner_image_8",
            ),
            User(
            firstName="Stella",
            lastName="Morgan",
            username="stellar_journey",
            age=30,
            bio="Hello, cosmic dreamers! I'm Stella, an astronomy enthusiast and night-sky admirer. With my telescope as my guide, I embark on a stellar journey through galaxies and nebulae, seeking the wonders of the universe. Join me on this astronomical adventure as we explore the beauty and mysteries of the cosmos together.",
            location="Astroville, California, USA",
            phone="+1 (415) 482-5210",
            email="stella.morgan_astro@gmail.com",
            profileImg="link_to_profile_image_9",
            bannerImg="link_to_banner_image_9",
            ),
            User(
            firstName="Asher",
            lastName="Kane",
            username="RusticAdventurer_37",
            age=37,
            bio="Hey, fellow wanderers! I'm Asher, a nature-loving adventurer with a passion for the great outdoors. My heart finds solace in the wilderness, where I embark on rustic journeys, camping under starlit skies, and hiking through lush trails. The rugged beauty of nature fuels my soul, and I seek to inspire others to embrace the untamed spirit of the wild.",
            location="Wildwood, Oregon, USA",
            phone="+1 (503) 987-6543",
            email="asher.kane37@gmail.com",
            profileImg="link_to_profile_image_10",
            bannerImg="link_to_banner_image_10",
            ),
            User(
            firstName="Ivy",
            lastName="Greene",
            username="WhimsicalWanderer_29",
            age=29,
            bio="Greetings, wanderers of wonder! I'm Ivy, a free-spirited soul with a penchant for whimsical adventures. My heart finds joy in exploring hidden gems, from secret gardens to charming villages. With a camera in hand, I capture the essence of each place I visit, spreading enchantment through my photography. Join me on this magical journey as we uncover the extraordinary in the ordinary.",
            location="Enchantia, Maine, USA",
            phone="+1 (207) 765-4321",
            email="ivy.greene29@gmail.com",
            profileImg="link_to_profile_image_11",
            bannerImg="link_to_banner_image_11",
            ),
            User(
            firstName="Carter",
            lastName="Reeves",
            username="ThrillPursuer_44",
            age=44,
            bio="Hello, adrenaline seekers! I'm Carter, an adventure junkie with an insatiable thirst for thrills. My life revolves around heart-pounding activities, from skydiving to extreme sports. My motto is to embrace fear and push boundaries, for that's where true growth lies. Join me on this daring journey as we chase the ultimate adrenaline rush and conquer new heights.",
            location="Rushville, Indiana, USA",
            phone="+1 (765) 987-6543",
            email="carter.reeves44@gmail.com",
            profileImg="link_to_profile_image_12",
            bannerImg="link_to_banner_image_12",
            ),
            User(
            firstName="Jasmine",
            lastName="Hart",
            username="SoulfulSeeker_25",
            age=25,
            bio="Hey, soulful souls! I'm Jasmine, a wanderer in search of life's deeper meaning and spiritual connections. My journey leads me to sacred places, yoga retreats, and meditation sanctuaries. I find peace and enlightenment through mindfulness practices and soulful conversations. Embrace your inner journey as we explore the beauty of mindfulness and the magic within ourselves.",
            location="Serene Springs, Arizona, USA",
            phone="+1 (602) 305-6173",
            email="jasmine.hart25@gmail.com",
            profileImg="link_to_profile_image_13",
            bannerImg="link_to_banner_image_13",
            ),
            User(
            firstName="Oliver",
            lastName="Hudson",
            username="TechNomad",
            age=32,
            bio="Greetings, fellow tech enthusiasts! I'm Oliver, a digital nomad and tech explorer. My laptop is my gateway to the world as I roam from one destination to another, embracing the freedom of a nomadic lifestyle. I'm fascinated by cutting-edge technologies and their impact on our lives. Join me on this virtual journey as we explore the ever-evolving landscape of the digital world.",
            location="Pixelville, California, USA",
            phone="+1 (415) 234-5678",
            email="oliver.hudson.tech@gmail.com",
            profileImg="link_to_profile_image_14",
            bannerImg="link_to_banner_image_14",
            ),
            User(
            firstName="Ava",
            lastName="Morgan",
            username="FuzzyPaws_29",
            age=29,
            bio="Hello, furry friends! I'm Ava, an animal lover and dedicated volunteer at animal shelters. My days are filled with joy as I care for and provide love to adorable four-legged companions. I'm passionate about animal welfare and hope to create a better world for our furry buddies. Join me on this heartwarming journey as we celebrate the unconditional love and happiness that animals bring to our lives.",
            location="Petropolis, Texas, USA",
            phone="+1 (512) 456-7890",
            email="ava.morgan.fuzzypaws@gmail.com",
            profileImg="link_to_profile_image_15",
            bannerImg="link_to_banner_image_15",
            ),
            User(
            firstName="Ash",
            lastName="Hunter",
            username="HikingAsh_36",
            age=36,
            bio="Hello, fellow hikers! I'm Ash, a nature enthusiast and avid hiker. My passion for the great outdoors leads me on epic journeys through rugged terrains and breathtaking landscapes. I believe that connecting with nature is a transformative experience that renews the soul. Join me on this hiking adventure as we conquer trails, summit mountains, and forge unforgettable memories in the wild.",
            location="Trailblazer Peak, Arizona, USA",
            phone="+1 (602) 765-4321",
            email="adventurous_ash36@gmail.com",
            profileImg="link_to_profile_image_29",
            bannerImg="link_to_banner_image_29",
            ),
            User(
            firstName="Ari",
            lastName="James",
            username="ariwanders",
            age=31,
            bio="Greetings, fellow explorers! I'm Ari, an adventurer with an insatiable curiosity for the unknown. From ancient ruins to hidden caves, I seek to uncover the wonders that history has left behind. My journey transcends time as I immerse myself in the stories of past civilizations. Join me on this wandering odyssey as we traverse through the pages of history and embrace the magic that lies beneath the surface.",
            location="Discovery Haven, Montana, USA",
            phone="+1 (406) 987-6543",
            email="wandering_ari31@gmail.com",
            profileImg="link_to_profile_image_30",
            bannerImg="link_to_banner_image_30",
            ),
            User(
            firstName="Aiden",
            lastName="Hartman",
            username="MindfulWanderer_28",
            age=28,
            bio="Hey, mindful souls! I'm Aiden, a seeker of serenity and a lover of mindfulness practices. I believe that nurturing the mind is as important as exploring the world. Whether through meditation, yoga, or self-reflection, I find balance and harmony in my inner journey. Join me on this path of mindfulness as we embrace the present moment and savor the beauty of self-awareness.",
            location="Tranquility Cove, Oregon, USA",
            phone="+1 (503) 456-7890",
            email="mindful_aiden28@gmail.com",
            profileImg="link_to_profile_image_31",
            bannerImg="link_to_banner_image_31",
            ),
            User(
            firstName="Luna",
            lastName="Knight",
            username="lunainspires",
            age=26,
            bio="Greetings, stargazers! I'm Luna, a dreamer and admirer of celestial wonders. My telescope is my portal to the cosmos, where I lose myself in the enchanting beauty of stars and galaxies. Join me on this celestial journey as we explore the vastness of space and uncover the mysteries of the universe.",
            location="Starfall Heights, Nevada, USA",
            phone="+1 (702) 328-5655",
            email="luna_inspires26@gmail.com",
            profileImg="link_to_profile_image_32",
            bannerImg="link_to_banner_image_32",
            ),
            User(
            firstName="Ryder",
            lastName="Moss",
            username="wanderlustryder_30",
            age=30,
            bio="Hello, fellow wanderers! I'm Ryder, a traveler with a passion for embracing cultures and immersing myself in new experiences. Whether exploring ancient cities or trekking through remote villages, I seek to understand the diversity that enriches our world. Join me on this adventure of wanderlust as we connect with people, discover traditions, and weave unforgettable tales.",
            location="Global Nomadville, California, USA",
            phone="+1 (415) 183-3055",
            email="wanderlust_ryder30@gmail.com",
            profileImg="link_to_profile_image_33",
            bannerImg="link_to_banner_image_33",
            ),
            User(
            firstName="Nova",
            lastName="Sullivan",
            username="CosmicWander_32",
            age=32,
            bio="Hey, cosmic explorers! I'm Nova, a stargazing enthusiast and admirer of celestial events. My nights are filled with wonder as I observe meteor showers and eclipse phenomena. Join me on this cosmic journey as we navigate through the galaxies and witness the magic of the universe unfold before our eyes.",
            location="Stellarium Haven, New York, USA",
            phone="+1 (518) 368-6013",
            email="cosmic_nova32@gmail.com",
            profileImg="link_to_profile_image_34",
            bannerImg="link_to_banner_image_34",
            ),
            User(
            firstName="Silas",
            lastName="Rivera",
            username="natureseeker_29",
            age=29,
            bio="Hello, nature enthusiasts! I'm Silas, a nature seeker and eco-conscious explorer. My heart finds solace in the wilderness, where I immerse myself in the beauty of untouched landscapes. Join me on this green journey as we celebrate the wonders of Mother Nature and strive to protect the delicate balance of our environment.",
            location="EcoHaven, Oregon, USA",
            phone="+1 (503) 120-6052",
            email="nature_silas29@gmail.com",
            profileImg="link_to_profile_image_35",
            bannerImg="link_to_banner_image_35",
            ),
            User(
            firstName="Ivy",
            lastName="Lawrence",
            username="greenthumbivy",
            age=27,
            bio="Greetings, fellow plant lovers! I'm Ivy, a green thumb enthusiast and gardener extraordinaire. My days are filled with nurturing botanical wonders and creating lush gardens. Join me on this green journey as we dive into the secrets of horticulture and cultivate beauty all around us.",
            location="Botanical Grove, Florida, USA",
            phone="+1 (305) 183-3369",
            email="green_ivy27@gmail.com",
            profileImg="link_to_profile_image_36",
            bannerImg="link_to_banner_image_36",
            ),
            User(
            firstName="Zara",
            lastName="Harrison",
            username="WanderZara_25",
            age=25,
            bio="Hello, wanderlust souls! I'm Zara, a free spirit and explorer of hidden gems. Whether it's lost ruins or undiscovered caves, I'm on a quest to find the extraordinary in the ordinary. Join me on this whimsical journey as we embrace the unknown and create extraordinary memories together.",
            location="Enchanted Trails, Colorado, USA",
            phone="+1 (720) 712-5065",
            email="wander.zara25@gmail.com",
            profileImg="link_to_profile_image_37",
            bannerImg="link_to_banner_image_37",
            ),
            User(
            firstName="Finn",
            lastName="Collins",
            username="WanderFinn",
            age=34,
            bio="Greetings, fellow adventurers! I'm Finn, a globetrotter with an insatiable appetite for travel. From bustling cities to remote islands, I seek to unravel the world's wonders one destination at a time. Join me on this thrilling journey as we embark on unforgettable escapades and make lasting connections across borders.",
            location="Wanderlust Haven, Hawaii, USA",
            phone="+1 (808) 306-1378",
            email="wander.finn34@gmail.com",
            profileImg="link_to_profile_image_38",
            bannerImg="link_to_banner_image_38",
            ),
            User(
            firstName="Lila",
            lastName="Morris",
            username="LilaLens",
            age=29,
            bio="Hey there, shutterbugs! I'm Lila, a photography enthusiast and capturer of moments. Through my lens, I strive to freeze time and convey emotions in a single frame. Join me on this photographic odyssey as we explore landscapes, immerse in cultures, and preserve memories that will stand the test of time.",
            location="Shutterville, California, USA",
            phone="+1 (949) 218-4475",
            email="lila.lens29@gmail.com",
            profileImg="link_to_profile_image_39",
            bannerImg="link_to_banner_image_39",
            ),
            User(
            firstName="Miles",
            lastName="Cooper",
            username="MilesToGo",
            age=31,
            bio="Greetings, fellow seekers! I'm Miles, an adventurer with an undying thirst for knowledge. From ancient texts to cryptic maps, I strive to uncover hidden truths and unravel historical enigmas. Join me on this quest for knowledge as we journey through the annals of time and discover the mysteries that lie beneath the surface.",
            location="Explorer's Ridge, Kentucky, USA",
            phone="+1 (859) 452-8995",
            email="miles.to.go31@gmail.com",
            profileImg="link_to_profile_image_40",
            bannerImg="link_to_banner_image_40",
            ),
            User(
            firstName="Zoe",
            lastName="Manning",
            username="ZestfulZoe_27",
            age=27,
            bio="Hello, zestful souls! I'm Zoe, a lively spirit and connoisseur of all things delightful. From savoring exotic cuisines to indulging in artistic performances, I celebrate the richness of life. Join me on this zestful journey as we immerse ourselves in the flavors, colors, and melodies that make every day an adventure worth savoring.",
            location="Blissful Bistro, New York, USA",
            phone="+1 (917) 412-2578",
            email="zestful.zoe27@gmail.com",
            profileImg="link_to_profile_image_41",
            bannerImg="link_to_banner_image_41",
            ),
            User(
            firstName="Caleb",
            lastName="Williams",
            username="SteadfastCaleb",
            age=32,
            bio="Greetings, steadfast souls! I'm Caleb, a firm believer in perseverance and unwavering determination. From conquering mountains to facing life's challenges head-on, I find strength in resilience. Join me on this steadfast journey as we navigate the twists and turns of life, forging a path of courage and unwavering resolve.",
            location="Fortitude Valley, Arizona, USA",
            phone="+1 (602) 785-1573",
            email="steadfast_caleb32@gmail.com",
            profileImg="link_to_profile_image_42",
            bannerImg="link_to_banner_image_42",
            ),
            User(
            firstName="Zara",
            lastName="Knight",
            username="ZaraZephyr_28",
            age=28,
            bio="Hello, fellow dreamers! I'm Zara, a lover of the winds and the poetry they carry. From sailing on vast oceans to dancing in meadows, I embrace the freedom that life offers. Join me on this ethereal journey as we chase the whispers of the wind and let our souls soar in its gentle caress.",
            location="Zephyr Hills, Montana, USA",
            phone="+1 (406) 912-3678",
            email="zara.zephyr28@gmail.com",
            profileImg="link_to_profile_image_43",
            bannerImg="link_to_banner_image_43",
            ),
        ]
        db.session.add_all(users)
#------------------------------------------------------------------------------------------HOBBY SEEDING--------------------------------------------------------------------------------------
        print("Seeding Hobbies...")
        hobbies = [
            Hobby(
                hobby="Writing Novels",
                description="Writing novels involves creating a long, narrative piece of literature, typically divided into chapters. It requires a well-developed plot, in-depth character development, and a thorough exploration of themes and settings."
            ),
            Hobby(
                hobby="Writing Blogs",
                description="Writing blogs involves creating content for an online platform called a blog. This hobby can range from personal journaling to providing information on specific topics, and allows for the sharing and discussion of ideas on the internet."
            ),
            Hobby(
                hobby="Writing Poetry",
                description="Writing poetry is a beautiful and expressive hobby that involves crafting verses and lines to evoke emotions, share personal experiences, and explore the beauty of language. Poets use metaphors, rhythm, and vivid imagery to create meaningful and thought-provoking poems."
            ),
            Hobby(
                hobby="Photography",
                description="Photography is the art of capturing light with a camera, usually via a digital sensor or film, to create an image. With the right camera equipment, one can even capture the smallest details in stunning clarity."
            ),
            Hobby(
                hobby="Crafting",
                description="Crafting includes a wide range of activities that involve making things with one's own hands. This can include knitting, crocheting, sewing, or origami. Crafting can be a relaxing and rewarding hobby."
            ),
            Hobby(
                hobby="Pottery",
                description="Pottery involves the shaping of clay into objects, which are then fired at high temperatures to make them hard and durable. This can result in functional items like dishes, or purely decorative pieces."
            ),
            Hobby(
                hobby="Ceramics",
                description="Ceramics involves creating objects from clay and other raw materials, then hardening them by high-temperature baking. It can result in an array of items from sculptures to pottery and is distinguished by its versatility and artistic expression."
            ),
            Hobby(
                hobby="Hiking",
                description="Hiking is an outdoor activity of walking in natural environments, often on hiking trails. It's a great way to enjoy the scenery, get exercise, and possibly spot some wildlife."
            ),
            Hobby(
                hobby="Trekking",
                description="Trekking is a long, vigorous hike, usually on trails in the countryside. Trekking trips can last from several days to months and often involve navigating through remote and often hilly or mountainous areas."
            ),
            Hobby(
                hobby="Gardening",
                description="Gardening involves growing and maintaining plants as part of horticulture. This can be done for utility, for example growing fruits and vegetables, or for beauty, like growing flowers."
            ),
            Hobby(
                hobby="Birdwatching",
                description="Birdwatching involves observing birds in their natural habitats as a hobby. It's a form of wildlife observation and can be done with the naked eye, or through devices like binoculars and telescopes."
            ),
            Hobby(
                hobby="Cycling",
                description="Cycling involves riding a bicycle for transport, recreation, or exercise. It's a good form of low-impact exercise that can be enjoyed by people of all ages."
            ),
            Hobby(
                hobby="Mountain Biking",
                description="Mountain biking is a type of off-road cycling over rough terrain, using specially designed mountain bikes. It's a fun and challenging activity that requires physical stamina and good bike handling skills."
            ),
            Hobby(
                hobby="Camping",
                description="Camping involves spending time outdoors, typically overnight, in a tent or recreational vehicle. Activities may include hiking, swimming, fishing, or simply enjoying the scenery and wildlife."
            ),
            Hobby(
                hobby="Outdoor Cooking",
                description="Outdoor cooking involves preparing food outside, as in a campground or a picnic area. It can involve a range of techniques, from grilling to open-fire cooking, and can create unique flavors and experiences."
            ),
            Hobby(
                hobby="Running",
                description="Running is a method of terrestrial locomotion that allows humans and other animals to move rapidly. It's an excellent way to improve physical health, relieve stress, and enjoy the outdoors."
            ),
            Hobby(
                hobby="Jogging",
                description="Jogging is a form of running at a slow or leisurely pace with the main intention to increase physical fitness and overall health. It's a less intense form of running, and can be a good starting point for beginners."
            ),
            Hobby(
                hobby="Yoga",
                description="Yoga is a group of physical, mental, and spiritual practices that originated in ancient India. It involves a variety of postures, breathing exercises, and meditation techniques that promote flexibility, strength, and inner peace."
            ),
            Hobby(
                hobby="Pilates",
                description="Pilates is a method of exercise that consists of low-impact flexibility, muscular strength, and endurance movements. It emphasizes proper postural alignment, core strength, and muscle balance."
            ),
            Hobby(
                hobby="Dancing",
                description="Dancing involves moving rhythmically to music, often following a set sequence of steps. There are many styles of dance, including salsa, hip-hop, and ballroom, each with their unique movements and music."
            ),
            Hobby(
                hobby="Martial Arts",
                description="Martial arts are codified systems and traditions of combat practiced for various reasons such as self-defense, competition, physical health and fitness, entertainment, as well as mental, physical, and spiritual development."
            ),
            Hobby(
                hobby="Swimming",
                description="Swimming is an activity that involves moving through water using the limbs. It's a good full-body exercise, a life-saving skill, and a competitive sport."
            ),
            Hobby(
                hobby="Playing a Musical Instrument",
                description="Playing a musical instrument involves creating music using an instrument. There are a variety of instruments, such as the guitar, piano, and violin, each with its unique sound and playing technique."
            ),
            Hobby(
                hobby="Playing Guitar",
                description="Playing the guitar involves creating music with a string instrument. Guitars can have six or more strings and can be plucked or strummed to create a variety of musical styles, from rock and blues to flamenco and country."
            ),
            Hobby(
                hobby="Playing Piano",
                description="Playing the piano involves creating music by pressing keys on a piano, which is a stringed musical instrument. It's versatile and can be used for a variety of musical genres, from classical to jazz."
            ),
            Hobby(
                hobby="Playing Violin",
                description="Playing the violin involves creating music with a stringed instrument that is played with a bow. Violins are often used in a variety of musical genres, including classical, folk, and bluegrass music."
            ),
            Hobby(
                hobby="Playing Drums",
                description="Playing the drums involves creating rhythms and beats using a set of drums and cymbals. Drums are often used in a variety of musical genres, including rock, jazz, and pop music."
            ),
            Hobby(
                hobby="Playing Flute",
                description="Playing the flute involves creating music by blowing air across an opening on a tube. The flute is a woodwind instrument often used in a variety of musical genres, including classical, jazz, and folk music."
            ),
            Hobby(
                hobby="Singing",
                description="Singing involves producing musical sounds with the voice, usually by forming words. It can be performed as a form of musical expression, as a hobby, as a part of religious devotion, or as a profession."
            ),
            Hobby(
                hobby="Acting",
                description="Acting involves portraying a character in a performance, such as in a play, a movie, or on television. It requires a variety of skills, including vocal projection, clarity of speech, physical expression, and emotional understanding."
            ),
            Hobby(
                hobby="Theater",
                description="Theater involves the performance of plays or other dramatic works. It's a collaborative form of fine art that uses live performers to present a real or imagined event before an audience."
            ),
            Hobby(
                hobby="Stand-up Comedy",
                description="Stand-up comedy is a comic style where a comedian performs in front of a live audience, usually speaking directly to them. The performer is commonly known as a comic, stand-up comic, comedian, or simply a stand-up."
            ),
            Hobby(
                hobby="Improv Workshops",
                description="Improv workshops involve learning and practicing improvisation, which is a form of live theater in which the plot, characters, and dialogue are made up on the spot. It encourages creativity, spontaneity, and collaboration."
            ),
            Hobby(
                hobby="Video Gaming",
                description="Video gaming involves playing electronic games, whether through consoles, computers, mobile phones, or another medium altogether. Video games are a popular form of entertainment that ranges from casual games to professional e-sports."
            ),
            Hobby(
                hobby="Board Games",
                description="Board games involve moving pieces on a pre-marked surface or 'board' according to a set of rules. They include strategy games, chance games, and a combination of the two, and have a wide range of complexity and themes."
            ),
            Hobby(
                hobby="Tabletop Role-Playing Games",
                description="Tabletop role-playing games are a form of role-playing game (RPG) in which the participants describe their characters' actions through speech. Games often use rules and game mechanics, along with imagination and storytelling, to simulate a world in which the players' characters exist."
            ),
            Hobby(
                hobby="Coding",
                description="Coding, or programming, involves writing instructions for computers to execute. These instructions, or 'code', can create software, websites, apps, and more. It's a highly sought-after skill with a wide variety of uses."
            ),
            Hobby(
                hobby="HTML Coding",
                description="HTML, or HyperText Markup Language, is the standard markup language for documents designed to be displayed in a web browser. It's used to structure the content on the webpage and is fundamental to web development."
            ),
            Hobby(
                hobby="JavaScript Coding",
                description="JavaScript is a high-level programming language used to create and control the content of a website. It's an essential part of web development and can create dynamic and interactive elements on web pages."
            ),
            Hobby(
                hobby="React Coding",
                description="React is a JavaScript library for building user interfaces, typically for single-page applications. It allows developers to create reusable UI components and is commonly used for web and mobile applications."
            ),
            Hobby(
                hobby="Python Coding",
                description="Python is a high-level programming language known for its readability and simplicity. It's used in a variety of applications, including web development, data analysis, AI, and machine learning."
            ),
            Hobby(
                hobby="Java Coding",
                description="Java is a general-purpose, high-level programming language known for its object-oriented structure. It's used in a variety of computing platforms, from embedded devices and mobile phones to enterprise servers and supercomputers."
            ),
            Hobby(
                hobby="DIY Electronics and Robotics",
                description="DIY electronics and robotics involve creating and modifying electronic devices and robots at home. This can range from simple tasks like assembling a kit to complex projects like designing and building a robot from scratch."
            ),
            Hobby(
                hobby="Collecting Stamps",
                description="Collecting stamps, or philately, involves gathering and categorizing postage stamps, which often feature beautiful artwork or commemorate significant events or people. It's a hobby that can teach a lot about history, geography, and art."
            ),
            Hobby(
                hobby="Collecting Coins",
                description="Collecting coins, or numismatics, is the collection and study of coins, including old coins, rare coins, or coins from different countries. Coins are pieces of history, offering insights into the culture and period they originate from."
            ),
            Hobby(
                hobby="Collecting Postcards",
                description="Collecting postcards, or deltiology, involves gathering and categorizing postcards, which are often sent by people while traveling. It's a way to explore different places, cultures, and times through the images and messages on the cards."
            ),
            Hobby(
                hobby="Collecting Vintage Items",
                description="Collecting vintage items involves acquiring and preserving items from the past. These could be toys, records, books, or any number of other items. The draw for collectors is often a combination of their historical significance and nostalgic value."
            ),
            Hobby(
                hobby="Collecting Memorabilia",
                description="Collecting memorabilia involves gathering items of personal interest, such as items related to a particular sports team, movie, music band, or historical event. These items can range from clothing, posters, autographed items, to merchandise."
            ),
            Hobby(
                hobby="Collecting Art",
                description="Collecting art involves acquiring art pieces that appeal to the collector's personal aesthetics. This could include paintings, sculptures, photographs, and other forms of visual art. Art collection can also be an investment."
            ),
            Hobby(
                hobby="Collecting Antiques",
                description="Collecting antiques involves acquiring old objects, typically more than a hundred years old, which are valued for their beauty, rarity, condition, utility, personal emotional connection, and/or other unique features."
            ),
            Hobby(
                hobby="Collecting Rare Books",
                description="Collecting rare books involves gathering books that are significant due to their age, scarcity, historical importance, or other factors. These books are often highly prized and carefully preserved by collectors."
            ),
            Hobby(
                hobby="Cooking",
                description="Cooking is the art and practice of preparing food by combining various ingredients and using various methods to create delicious and nourishing dishes. Whether it's experimenting with new recipes or perfecting traditional ones, cooking is a hobby that brings joy and satisfaction to many food enthusiasts."
            ),
            Hobby(
                hobby="Baking",
                description="Baking is a method of cooking food that uses prolonged dry heat, typically in an oven. Baking, especially of breads, pastries, cakes, and other desserts, is a hobby enjoyed by many and can be quite rewarding."
            ),
            Hobby(
                hobby="Cooking International Cuisines",
                description="Cooking international cuisines involves preparing dishes from various countries and cultures. This hobby allows individuals to explore and appreciate different culinary traditions from around the world."
            ),
            Hobby(
                hobby="Food Photography",
                description="Food photography is a still life specialization of commercial photography, aimed at producing attractive photographs of food for a variety of uses including in advertisements, magazines, cookbooks, and social media."
            ),
            Hobby(
                hobby="Food Styling",
                description="Food styling is the art of arranging food so that it looks tasty and fresh. This is important in a number of fields, particularly in the advertising industry where products need to look as appealing as possible."
            ),
            Hobby(
                hobby="Brewing Beer",
                description="Brewing beer involves fermenting cereal grains to produce a carbonated, alcoholic beverage. Home brewing allows for great customization of flavors and styles, making it a popular hobby for many beer enthusiasts."
            ),
            Hobby(
                hobby="Making Wine",
                description="Making wine involves fermenting grapes or other fruits to create a unique blend of flavors. Wine making, or vinification, requires knowledge and patience, but can be an enjoyable and rewarding hobby."
            ),
            Hobby(
                hobby="BBQ and Grilling",
                description="BBQ and grilling involve cooking food on a grill or open fire. The techniques and flavors differ widely across the world, making it a versatile and sociable hobby for food lovers."
            ),
            Hobby(
                hobby="Reading Fiction Books",
                description="Reading fiction books involves immersing oneself in a narrative that originates from an author's imagination. Genres can range widely, from fantasy to thriller to romance, providing endless opportunities for enjoyment and escapism."
            ),
            Hobby(
                hobby="Reading Non-Fiction Books",
                description="Reading non-fiction books involves learning about real-world subjects from literature. This can include history, biographies, self-help, science, and more. It's a way to gain knowledge and understanding about various topics."
            ),
            Hobby(
                hobby="Book Club Participation",
                description="Book club participation involves reading books and discussing them in a group setting. It's a way to enjoy literature, share ideas, and socialize with others who share a love for books."
            ),
            Hobby(
                hobby="Writing Book Reviews",
                description="Writing book reviews involves reading a book and writing a critique of it for the benefit of others. This can include a summary of the content, an analysis of the writing style, and personal opinions about the book."
            ),
            Hobby(
                hobby="Running a Book Blog",
                description="Running a book blog involves writing about books on a blog. This could include writing reviews, conducting author interviews, and providing recommendations. It's a great hobby for avid readers who enjoy sharing their love of books with others."
            ),
            Hobby(
                hobby="Traveling",
                description="Traveling involves visiting new places, both near and far, to experience different cultures, landscapes, and activities. It provides opportunities to meet new people, try new foods, and learn about history and traditions."
            ),
            Hobby(
                hobby="Geocaching",
                description="Geocaching is an outdoor recreational activity, in which participants use a GPS receiver or mobile device to hide and seek containers, called 'geocaches' or 'caches', at specific locations marked by coordinates all over the world."
            ),
            Hobby(
                hobby="Urban Exploration",
                description="Urban exploration involves exploring manmade structures, usually abandoned ruins or not usually seen components of the urban environment. Safety and legality are important considerations for those engaged in this hobby."
            ),
            Hobby(
                hobby="Camping",
                description="Camping involves spending time outdoors, typically staying overnight in a tent, a caravan, or even under the stars. It's a way to enjoy nature and outdoor activities like hiking, fishing, and wildlife spotting."
            ),
            Hobby(
                hobby="Road Trips",
                description="Road trips involve long distance travel on the road. Whether it's a journey across the state or across the country, road trips can be a fun and flexible way to travel and see new places."
            ),
            Hobby(
                hobby="Bird Watching",
                description="Bird watching involves observing birds in their natural habitat. Bird watchers, or birders, use binoculars or telescopes to spot and identify different species, often documenting their findings in a 'life list'."
            ),
            Hobby(
                hobby="Astrology",
                description="Astrology is a belief system that suggests there is a relationship between the positions of celestial bodies and events in the human world. Many people enjoy astrology as a hobby, reading and interpreting horoscopes or natal charts."
            ),
            Hobby(
                hobby="Meditation",
                description="Meditation is a practice where an individual uses a technique such as mindfulness, or focusing their mind on a particular object, thought or activity to train attention and awareness, and achieve a mentally clear and emotionally calm and stable state."
            ),
            Hobby(
                hobby="Learning New Languages",
                description="Learning new languages involves studying the structure, vocabulary, and grammar of foreign languages. In addition to being a valuable skill, it can also be a fun hobby that allows for better understanding and appreciation of other cultures."
            ),
            Hobby(
                hobby="Learning Musical Instruments",
                description="Learning musical instruments involves practicing to play instruments such as the guitar, piano, violin, drums, or any other musical instrument. It's a skill that takes time and patience to develop but can provide a lifetime of enjoyment."
            ),
            Hobby(
                hobby="Learning Magic Tricks",
                description="Learning magic tricks involves practicing skills like sleight of hand and illusion to entertain and amaze an audience. This hobby requires patience and dexterity but can be a lot of fun to learn and perform."
            ),
            Hobby(
                hobby="Learning to Dance",
                description="Learning to dance involves mastering the movements and steps that make up a particular style of dance. Dance styles can range from ballet to salsa to hip-hop, each offering a unique way to express oneself through movement."
            ),
            Hobby(
                hobby="Learning Calligraphy",
                description="Learning calligraphy involves practicing the art of writing in an expressive, beautiful, and skillful manner. Calligraphy requires steady hands and patience, but can be a relaxing and rewarding hobby."
            ),
            Hobby(
                hobby="Learning Pottery",
                description="Learning pottery involves creating objects from clay and other ceramic materials, which are then fired at high temperatures to become pottery. It's a creative hobby that can result in beautiful, functional art pieces."
            ),
            Hobby(
                hobby="Singing",
                description="Singing involves producing musical sounds with the voice, usually to accompany a song. Singing can be done professionally or as a hobby and can be enjoyed solo or with others in a choir or band."
            ),
            Hobby(
                hobby="Painting",
                description="Painting involves applying paint to a medium (such as canvas or paper) to create an artwork. There are various styles and techniques of painting, making it a versatile and creative outlet."
            ),
            Hobby(
                hobby="Drawing",
                description="Drawing involves making pictures by making lines on paper, or other surfaces. It can be a simple hobby to start, but with time and practice, many people can develop their skills to produce stunning artworks."
            ),
            Hobby(
                hobby="Knitting",
                description="Knitting involves creating a fabric or textile by creating interlocking loops of yarn. It's a hobby that can be picked up by almost anyone and can result in everything from blankets to sweaters to stuffed animals."
            ),
            Hobby(
                hobby="Crocheting",
                description="Crocheting involves creating a fabric by interlocking loops of yarn or thread with a crochet hook. Like knitting, crocheting can result in a variety of handmade items like doilies, scarves, and hats."
            ),
            Hobby(
                hobby="Sewing",
                description="Sewing involves fastening or attaching objects using stitches made with a needle and thread. It's a practical hobby that can be used to make, mend, or alter clothes and other items."
            ),
            Hobby(
                hobby="Embroidery",
                description="Embroidery involves decorating fabric or other materials using a needle to apply thread or yarn. It's a hobby that can be as simple or complex as the pattern demands, and it's often used to personalize clothing, linens, and wall hangings."
            ),
            Hobby(
                hobby="Gardening",
                description="Gardening involves the cultivation and care of plants. This can include flowers, vegetables, fruits, herbs, or decorative plants. Gardening can be a relaxing and rewarding outdoor activity."
            ),
            Hobby(
                hobby="Landscaping",
                description="Landscaping involves the planning, design, and maintenance of outdoor spaces. This can include plant selection and placement, pathway design, and other aesthetic decisions. It's a more large-scale and intricate hobby than gardening."
            ),
            Hobby(
                hobby="Composting",
                description="Composting involves collecting organic waste (like food scraps and lawn clippings) and letting it decompose over time. The result is nutrient-rich soil that can be used in gardening. It's a practical hobby that's good for the environment."
            ),
            Hobby(
                hobby="Urban Farming",
                description="Urban farming involves growing food in cities, often in small spaces like balconies, rooftops, or indoor gardens. It's a hobby that can provide fresh, local food and promote sustainable living."
            ),
            Hobby(
                hobby="Keeping Bees",
                description="Keeping bees, or beekeeping, involves the maintenance of bee colonies, usually in hives. It's a hobby that can provide honey and promote the pollination of nearby plants."
            ),
            Hobby(
                hobby="Fishing",
                description="Fishing involves catching fish, either as a profession, for survival, or for sport. As a hobby, it's a relaxing outdoor activity that can also provide an opportunity to catch a meal."
            ),
            Hobby(
                hobby="Hunting",
                description="Hunting involves tracking and killing animals, either for food, for sport, or for trade. It's a hobby that requires knowledge of animals and their behaviors, outdoor survival skills, and shooting skills."
            ),
            Hobby(
                hobby="Surfing",
                description="Surfing involves riding waves on a board, either standing up, lying down, or kneeling. It's a physically demanding hobby that also offers adrenaline and a close connection to nature."
            ),
            Hobby(
                hobby="Food Drive Participation",
                description="Participating in food drives involves collecting and donating food to support local communities, particularly those dealing with food insecurity. This typically includes gathering non-perishable food items and delivering them to a central location. It's a community-oriented hobby that directly helps those in need and can raise awareness about food security issues."
            ),
            Hobby(
                hobby="Volunteering",
                description="Volunteering involves donating one's time and energy to support a cause or organization without expecting monetary compensation. This can take many forms, from helping at local charities or community events, supporting environmental initiatives, to aiding educational programs. It provides an opportunity to give back to the community, develop new skills, and make social connections."
            ),
        ]
        db.session.add_all(hobbies)
#---------------------------------------------------------------------------------USERS HOBBIES-----------------------------------------------------------------------------------------------
#print some of these can defnitely have extra things
        print("Seeding our existing Users hobbies...")
        user_hobbies = [
            UserHobby(expertise=9, user_id=1, hobby_id=80),   # Luna Everwood - Painting ✔
            UserHobby(expertise=7, user_id=2, hobby_id=9),   # Zephyr Wilde - Adventuring - Trekking ✔
            UserHobby(expertise=5, user_id=3, hobby_id=1),   # Seren Hawthorne - Writing - Writing Novels ✔ 
            UserHobby(expertise=8, user_id=4, hobby_id=9),   # Atlas Stone - Mountain Exploration - Trekking ✔
            UserHobby(expertise=6, user_id=5, hobby_id=31),   # Aria Nightingale - Music - Theater ✔
            UserHobby(expertise=9, user_id=6, hobby_id=71),   # Max Adler - Astronomy - Astrology ✔
            UserHobby(expertise=4, user_id=7, hobby_id=60),   # Eliza Bard - Reading Fiction Books ✔
            UserHobby(expertise=7, user_id=8, hobby_id=20),   # Phoenix Blaze - Fire Dancing - Dancing ✔
            UserHobby(expertise=8, user_id=9, hobby_id=71),   # Stella Morgan - Astronomy - Astrology✔
            UserHobby(expertise=5, user_id=10, hobby_id=9),   # Asher Kane - Hiking - Trekking
            UserHobby(expertise=6, user_id=11, hobby_id=4),  # Ivy Greene - Photography ✔
            UserHobby(expertise=4, user_id=12, hobby_id=13),  # Carter Reeves - Adrenaline Activities - Mountain Biking	 ✔
            UserHobby(expertise=5, user_id=13, hobby_id=72),  # Jasmine Hart - Mindfulness - Meditation (add yoga 18) ✔
            UserHobby(expertise=8, user_id=14, hobby_id=37),  # Oliver Hudson - Technology - Coding ✔
            UserHobby(expertise=6, user_id=15, hobby_id=95),  # Ava Morgan - Animal Welfare - Volunteering ✔
            UserHobby(expertise=9, user_id=16, hobby_id=8),  # Ash Hunter - Nature - Hiking ✔
            UserHobby(expertise=3, user_id=17, hobby_id=50),  # Ari James - History - Collecting Antiques ✔
            UserHobby(expertise=7, user_id=18, hobby_id=72),  # Aiden Hartman - Mindfulness - Meditation ✔
            UserHobby(expertise=5, user_id=19, hobby_id=71),  # Luna Knight - Astronomy - Astrology✔
            UserHobby(expertise=4, user_id=20, hobby_id=65),  # Ryder Moss - Travel - Traveling ✔
            UserHobby(expertise=8, user_id=21, hobby_id=71),  # Nova Sullivan - Stargazing - Astrology✔
            UserHobby(expertise=6, user_id=22, hobby_id=9),   # Silas Rivera - Nature - Trekking✔
            UserHobby(expertise=3, user_id=23, hobby_id=10),  # Ivy Lawrence - Gardening ✔
            UserHobby(expertise=5, user_id=24, hobby_id=3),   # Zara Harrison - Poetry - Writing Poetry	✔
            UserHobby(expertise=7, user_id=25, hobby_id=65),  # Finn Collins - Travel - Traveling ✔
            UserHobby(expertise=6, user_id=26, hobby_id=4),   # Lila Morris - Photography ✔
            UserHobby(expertise=8, user_id=27, hobby_id=47),  # Miles Cooper - History - Vintage Items✔
            UserHobby(expertise=3, user_id=28, hobby_id=54),  # Zoe Manning - Culinary Exploration - Cooking International Cuisines	 ✔
            UserHobby(expertise=5, user_id=29, hobby_id=9),   # Caleb Williams - Resilience - Trekking ✔
            UserHobby(expertise=7, user_id=30, hobby_id=3),  # Zara Knight - Poetry - Writing Poetry ✔
        ]
        db.session.add_all(user_hobbies)
        db.session.commit()

 