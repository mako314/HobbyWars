from random import choice as rc, randrange

from app import app
from models import db, User, Hobby, UserHobby, Competition, Result, Entry

from random import randint, choice as rc


if __name__ == '__main__':
    with app.app_context():
        #Clear dbs
        print("Clearing db...")
        Result.query.delete()
        Entry.query.delete()
        Competition.query.delete()
        UserHobby.query.delete()
        Hobby.query.delete()
        User.query.delete()
#------------------------------------------------------------------------------------------USER SEEDING---------------------------------------------------------------------------------------
        #Seed users
        print("Seeding potential Users...")
        # users = [
        user_1 = User(
            firstName="Emily",
            lastName="Everwood",
            username="EnchantingEmily88",
            _password_hash="",
            age=28,
            bio="Hey there! I'm Emily, a nature enthusiast, artist, and dreamer. I find so much inspiration in the breathtaking beauty of national parks that I try to capture through my vibrant paintings. My art aims to evoke a sense of tranquility and wonder, reflecting my deep connection with nature. Exploring the world's natural wonders has become a life-changing journey that keeps me endlessly curious.",
            location="Aspen, Colorado, USA",
            phone="+1 (970) 789-1234",
            email="Emily.paints.magic88@gmail.com",
            profileImg="https://avatarfiles.alphacoders.com/121/thumb-121112.jpg",
            bannerImg="https://images3.alphacoders.com/130/1309519.jpg",
            )
        
        
        user_2 = User(
            firstName="Zephyr",
            lastName="Wilde",
            username="WandererZephyr_42",
            _password_hash="",
            age=35,
            bio="Greetings, everyone! I'm Zephyr, an adventurer and storyteller with an insatiable curiosity for unraveling mysteries. My thrilling journeys take me to the far reaches of our country, where I document forgotten tales and weave them into captivating narratives that leave my readers in awe. With my trusty journal and an explorer's spirit, I roam the wilderness, seeking untold stories and adventures that ignite the imagination.",
            location="Mystic Falls, Vermont, USA",
            phone="+1 (802) 456-7890",
            email="zephyr.explores42@gmail.com",
            profileImg="link_to_profile_image_2",
            bannerImg="link_to_banner_image_2",
            )
            
        user_3 = User(
            firstName="Seren",
            lastName="Hawthorne",
            username="melodic_scribe_22",
            _password_hash="",
            age=22,
            bio="Hello, lovely people! I'm Seren, a music lover, tea enthusiast, and aspiring writer. My days are filled with the soul-stirring melodies of my own composition and heartfelt ballads that express emotions words can't capture. Armed with a pen and my favorite chamomile tea, I'm on a journey to craft my first novel and share my unique voice with the world. Embracing the magic of storytelling and music, I hope to touch hearts and inspire others.",
            location="Melodyville, Tennessee, USA",
            phone="+1 (615) 234-5678",
            email="seren.hawthorne.scribe@gmail.com",
            profileImg="link_to_profile_image_3",
            bannerImg="link_to_banner_image_3",
            )
        
        user_4 = User(
            firstName="Atlas",
            lastName="Stone",
            username="mountainseeker_atlas",
            _password_hash="",
            age=42,
            bio="Hey! I'm Atlas, an explorer and adrenaline junkie. My life revolves around conquering mountains, both literal and metaphorical, as I strive to inspire others to embrace an active and adventurous lifestyle. My passion lies in guiding people towards unforgettable experiences and empowering them to lead fulfilling lives. Exploring the world and helping others discover their potential keeps me energized and grateful every day.",
            location="Summitville, California, USA",
            phone="+1 (530) 987-6543",
            email="atlas.stone_explores42@gmail.com",
            profileImg="link_to_profile_image_4",
            bannerImg="link_to_banner_image_4",
            )
        
        user_5 = User(
            firstName="Aria",
            lastName="Nightingale",
            username="Harmonic_Aria31",
            _password_hash="",
            age=31,
            bio="Hello, wonderful souls! I'm Aria, a classical musician and opera aficionado. My deepest passion is to enchant audiences with soul-stirring performances in grand theaters. The stage becomes my canvas, where I paint emotions with every note I sing. Through my art, I hope to touch hearts and connect with the shared human experience. Join me on this musical journey that transcends boundaries and brings harmony to our lives.",
            location="Harmonyville, New York, USA",
            phone="+1 (518) 765-4321",
            email="Aria.Harmonic31@gmail.com",
            profileImg="https://avatarfiles.alphacoders.com/731/7315.jpg",
            bannerImg="https://images4.alphacoders.com/457/4574.jpg",
            )
        
        user_6 = User(
            firstName="Max",
            lastName="Adler",
            username="CosmicMax46",
            _password_hash="",
            age=46,
            bio="Greetings, stargazers! I'm Max, an amateur astronomer and space enthusiast. The night sky has always held a special place in my heart, and I find immense joy in gazing at the wonders of the cosmos. Armed with my telescope, I explore the universe from my backyard observatory, marveling at the beauty and vastness of the stars. Join me on this cosmic journey as we uncover the mysteries of the universe together.",
            location="Starlight City, Arizona, USA",
            phone="+1 (602) 111-2222",
            email="Max.Cosmic46@gmail.com",
            profileImg="https://avatarfiles.alphacoders.com/128/thumb-128895.jpg",
            bannerImg="https://images2.alphacoders.com/542/542730.png",
            )
        
        user_7 = User(
            firstName="Eliza",
            lastName="Bard",
            username="InkWanderlust",
            _password_hash="",
            age=25,
            bio="Hello, fellow bookworms! I'm Eliza, and I absolutely adore losing myself in the enchanting world of literature. Imagination and adventure await within the pages of each book I dive into. Armed with my favorite novels, I embark on literary journeys through enchanted lands and epic tales. Join me on these captivating adventures as we explore the magic and wonder that words can weave.",
            location="Enchanted Hollow, Massachusetts, USA",
            phone="+1 (508) 481-6234",
            email="eliza.inkwander25@gmail.com",
            profileImg="link_to_profile_image_7",
            bannerImg="link_to_banner_image_7",
            )
        
        user_8 = User(
            firstName="Phoenix",
            lastName="Blaze",
            username="FieryEntertainer_53",
            _password_hash="",
            age=53,
            bio="Greetings, fellow thrill-seekers! I'm Phoenix, a fire performer and adrenaline junkie. My passion lies in mesmerizing audiences with daring fire dancing shows that leave everyone breathless. Embracing the thrill of the flames, I've found a profound connection with the elements and the liberating feeling of transcending fear. Join me on this fiery journey as we embrace the heat and explore the beauty that lies within the flames.",
            location="Emberbrook, Texas, USA",
            phone="+1 (512) 820-5630",
            email="Phoenix.Fiery53@gmail.com",
            profileImg="link_to_profile_image_8",
            bannerImg="link_to_banner_image_8",
            )
        
        user_9 = User(
            firstName="Stella",
            lastName="Morgan",
            username="stellar_journey",
            _password_hash="",
            age=30,
            bio="Hello, cosmic dreamers! I'm Stella, an astronomy enthusiast and night-sky admirer. With my telescope as my guide, I embark on a stellar journey through galaxies and nebulae, seeking the wonders of the universe. Join me on this astronomical adventure as we explore the beauty and mysteries of the cosmos together.",
            location="Astroville, California, USA",
            phone="+1 (415) 482-5210",
            email="stella.morgan_astro@gmail.com",
            profileImg="link_to_profile_image_9",
            bannerImg="link_to_banner_image_9",
            )
        
        user_10 = User(
            firstName="Asher",
            lastName="Kane",
            username="RusticAdventurer_37",
            _password_hash="",
            age=37,
            bio="Hey, fellow wanderers! I'm Asher, a nature-loving adventurer with a passion for the great outdoors. My heart finds solace in the wilderness, where I embark on rustic journeys, camping under starlit skies, and hiking through lush trails. The rugged beauty of nature fuels my soul, and I seek to inspire others to embrace the untamed spirit of the wild.",
            location="Wildwood, Oregon, USA",
            phone="+1 (503) 987-6543",
            email="asher.kane37@gmail.com",
            profileImg="link_to_profile_image_10",
            bannerImg="link_to_banner_image_10",
            )
        
        user_11 = User(
            firstName="Ivy",
            lastName="Greene",
            username="WhimsicalWanderer_29",
            _password_hash="",
            age=29,
            bio="Greetings, wanderers of wonder! I'm Ivy, a free-spirited soul with a penchant for whimsical adventures. My heart finds joy in exploring hidden gems, from secret gardens to charming villages. With a camera in hand, I capture the essence of each place I visit, spreading enchantment through my photography. Join me on this magical journey as we uncover the extraordinary in the ordinary.",
            location="Enchantia, Maine, USA",
            phone="+1 (207) 765-4321",
            email="ivy.greene29@gmail.com",
            profileImg="https://avatarfiles.alphacoders.com/127/thumb-127802.jpg",
            bannerImg="https://images2.alphacoders.com/649/649969.jpg",
            )
        
        user_12 = User(
            firstName="Carter",
            lastName="Reeves",
            username="ThrillPursuer_44",
            _password_hash="",
            age=44,
            bio="Hello, adrenaline seekers! I'm Carter, an adventure junkie with an insatiable thirst for thrills. My life revolves around heart-pounding activities, from skydiving to extreme sports. My motto is to embrace fear and push boundaries, for that's where true growth lies. Join me on this daring journey as we chase the ultimate adrenaline rush and conquer new heights.",
            location="Rushville, Indiana, USA",
            phone="+1 (765) 987-6543",
            email="carter.reeves44@gmail.com",
            profileImg="link_to_profile_image_12",
            bannerImg="link_to_banner_image_12",
            )
        
        user_13 = User(
            firstName="Jasmine",
            lastName="Hart",
            username="SoulfulSeeker_25",
            _password_hash="",
            age=25,
            bio="Hey, soulful souls! I'm Jasmine, a wanderer in search of life's deeper meaning and spiritual connections. My journey leads me to sacred places, yoga retreats, and meditation sanctuaries. I find peace and enlightenment through mindfulness practices and soulful conversations. Embrace your inner journey as we explore the beauty of mindfulness and the magic within ourselves.",
            location="Serene Springs, Arizona, USA",
            phone="+1 (602) 305-6173",
            email="jasmine.hart25@gmail.com",
            profileImg="link_to_profile_image_13",
            bannerImg="link_to_banner_image_13",
            )
        
        user_14 = User(
            firstName="Oliver",
            lastName="Hudson",
            username="TechNomad",
            _password_hash="",
            age=32,
            bio="Greetings, fellow tech enthusiasts! I'm Oliver, a digital nomad and tech explorer. My laptop is my gateway to the world as I roam from one destination to another, embracing the freedom of a nomadic lifestyle. I'm fascinated by cutting-edge technologies and their impact on our lives. Join me on this virtual journey as we explore the ever-evolving landscape of the digital world.",
            location="Pixelville, California, USA",
            phone="+1 (415) 234-5678",
            email="oliver.hudson.tech@gmail.com",
            profileImg="https://avatarfiles.alphacoders.com/345/thumb-345469.png",
            bannerImg="https://images4.alphacoders.com/130/1307940.png",
            )
        
        user_15 = User(
            firstName="Ava",
            lastName="Morgan",
            username="FuzzyPaws_29",
            _password_hash="",
            age=29,
            bio="Hello, furry friends! I'm Ava, an animal lover and dedicated volunteer at animal shelters. My days are filled with joy as I care for and provide love to adorable four-legged companions. I'm passionate about animal welfare and hope to create a better world for our furry buddies. Join me on this heartwarming journey as we celebrate the unconditional love and happiness that animals bring to our lives.",
            location="Petropolis, Texas, USA",
            phone="+1 (512) 456-7890",
            email="ava.morgan.fuzzypaws@gmail.com",
            profileImg="link_to_profile_image_15",
            bannerImg="link_to_banner_image_15",
            )
        
        user_16 = User(
            firstName="Ash",
            lastName="Hunter",
            username="HikingAsh_36",
            _password_hash="",
            age=36,
            bio="Hello, fellow hikers! I'm Ash, a nature enthusiast and avid hiker. My passion for the great outdoors leads me on epic journeys through rugged terrains and breathtaking landscapes. I believe that connecting with nature is a transformative experience that renews the soul. Join me on this hiking adventure as we conquer trails, summit mountains, and forge unforgettable memories in the wild.",
            location="Trailblazer Peak, Arizona, USA",
            phone="+1 (602) 765-4321",
            email="adventurous_ash36@gmail.com",
            profileImg="link_to_profile_image_29",
            bannerImg="link_to_banner_image_29",
            )
        
        user_17 = User(
            firstName="Ari",
            lastName="James",
            username="ariwanders",
            _password_hash="",
            age=31,
            bio="Greetings, fellow explorers! I'm Ari, an adventurer with an insatiable curiosity for the unknown. From ancient ruins to hidden caves, I seek to uncover the wonders that history has left behind. My journey transcends time as I immerse myself in the stories of past civilizations. Join me on this wandering odyssey as we traverse through the pages of history and embrace the magic that lies beneath the surface.",
            location="Discovery Haven, Montana, USA",
            phone="+1 (406) 987-6543",
            email="wandering_ari31@gmail.com",
            profileImg="link_to_profile_image_30",
            bannerImg="link_to_banner_image_30",
            )
        
        user_18 = User(
            firstName="Aiden",
            lastName="Hartman",
            username="MindfulWanderer_28",
            _password_hash="",
            age=28,
            bio="Hey, mindful souls! I'm Aiden, a seeker of serenity and a lover of mindfulness practices. I believe that nurturing the mind is as important as exploring the world. Whether through meditation, yoga, or self-reflection, I find balance and harmony in my inner journey. Join me on this path of mindfulness as we embrace the present moment and savor the beauty of self-awareness.",
            location="Tranquility Cove, Oregon, USA",
            phone="+1 (503) 456-7890",
            email="mindful_aiden28@gmail.com",
            profileImg="link_to_profile_image_31",
            bannerImg="link_to_banner_image_31",
            )
        
        user_19 = User(
            firstName="Luna",
            lastName="Knight",
            username="lunainspires",
            _password_hash="",
            age=26,
            bio="Greetings, stargazers! I'm Luna, a dreamer and admirer of celestial wonders. My telescope is my portal to the cosmos, where I lose myself in the enchanting beauty of stars and galaxies. Join me on this celestial journey as we explore the vastness of space and uncover the mysteries of the universe.",
            location="Starfall Heights, Nevada, USA",
            phone="+1 (702) 328-5655",
            email="luna_inspires26@gmail.com",
            profileImg="link_to_profile_image_32",
            bannerImg="link_to_banner_image_32",
            )
        
        user_20 = User(
            firstName="Ryder",
            lastName="Moss",
            username="wanderlustryder_30",
            _password_hash="",
            age=30,
            bio="Hello, fellow wanderers! I'm Ryder, a traveler with a passion for embracing cultures and immersing myself in new experiences. Whether exploring ancient cities or trekking through remote villages, I seek to understand the diversity that enriches our world. Join me on this adventure of wanderlust as we connect with people, discover traditions, and weave unforgettable tales.",
            location="Global Nomadville, California, USA",
            phone="+1 (415) 183-3055",
            email="wanderlust_ryder30@gmail.com",
            profileImg="link_to_profile_image_33",
            bannerImg="link_to_banner_image_33",
            )
        
        user_21 = User(
            firstName="Nova",
            lastName="Sullivan",
            username="CosmicWander_32",
            _password_hash="",
            age=32,
            bio="Hey, cosmic explorers! I'm Nova, a stargazing enthusiast and admirer of celestial events. My nights are filled with wonder as I observe meteor showers and eclipse phenomena. Join me on this cosmic journey as we navigate through the galaxies and witness the magic of the universe unfold before our eyes.",
            location="Stellarium Haven, New York, USA",
            phone="+1 (518) 368-6013",
            email="cosmic_nova32@gmail.com",
            profileImg="link_to_profile_image_34",
            bannerImg="link_to_banner_image_34",
            )
        
        user_22 = User(
            firstName="Silas",
            lastName="Rivera",
            username="natureseeker_29",
            _password_hash="",
            age=29,
            bio="Hello, nature enthusiasts! I'm Silas, a nature seeker and eco-conscious explorer. My heart finds solace in the wilderness, where I immerse myself in the beauty of untouched landscapes. Join me on this green journey as we celebrate the wonders of Mother Nature and strive to protect the delicate balance of our environment.",
            location="EcoHaven, Oregon, USA",
            phone="+1 (503) 120-6052",
            email="nature_silas29@gmail.com",
            profileImg="https://avatarfiles.alphacoders.com/328/thumb-328004.jpg",
            bannerImg="https://images7.alphacoders.com/132/1323341.jpeg",
            )
        
        user_23 = User(
            firstName="Ivy",
            lastName="Lawrence",
            username="greenthumbivy",
            _password_hash="",
            age=27,
            bio="Greetings, fellow plant lovers! I'm Ivy, a green thumb enthusiast and gardener extraordinaire. My days are filled with nurturing botanical wonders and creating lush gardens. Join me on this green journey as we dive into the secrets of horticulture and cultivate beauty all around us.",
            location="Botanical Grove, Florida, USA",
            phone="+1 (305) 183-3369",
            email="green_ivy27@gmail.com",
            profileImg="link_to_profile_image_36",
            bannerImg="link_to_banner_image_36",
            )
        
        user_24 = User(
            firstName="Zoe",
            lastName="Harrison",
            username="WanderZoe_25",
            _password_hash="",
            age=25,
            bio="Hello, wanderlust souls! I'm Zoe, a free spirit and explorer of hidden gems. Whether it's lost ruins or undiscovered caves, I'm on a quest to find the extraordinary in the ordinary. Join me on this whimsical journey as we embrace the unknown and create extraordinary memories together.",
            location="Enchanted Trails, Colorado, USA",
            phone="+1 (720) 712-5065",
            email="wander.Zoe25@gmail.com",
            profileImg="link_to_profile_image_37",
            bannerImg="link_to_banner_image_37",
            )
        
        user_25 = User(
            firstName="Finn",
            lastName="Collins",
            username="WanderFinn",
            _password_hash="",
            age=34,
            bio="Greetings, fellow adventurers! I'm Finn, a globetrotter with an insatiable appetite for travel. From bustling cities to remote islands, I seek to unravel the world's wonders one destination at a time. Join me on this thrilling journey as we embark on unforgettable escapades and make lasting connections across borders.",
            location="Wanderlust Haven, Hawaii, USA",
            phone="+1 (808) 306-1378",
            email="wander.finn34@gmail.com",
            profileImg="link_to_profile_image_38",
            bannerImg="link_to_banner_image_38",
            )
    
        user_26 = User(
            firstName="Lila",
            lastName="Morris",
            username="LilaLens",
            _password_hash="",
            age=29,
            bio="Hey there, shutterbugs! I'm Lila, a photography enthusiast and capturer of moments. Through my lens, I strive to freeze time and convey emotions in a single frame. Join me on this photographic odyssey as we explore landscapes, immerse in cultures, and preserve memories that will stand the test of time.",
            location="Shutterville, California, USA",
            phone="+1 (949) 218-4475",
            email="lila.lens29@gmail.com",
            profileImg="link_to_profile_image_39",
            bannerImg="link_to_banner_image_39",
            )
        
        user_27 = User(
            firstName="Miles",
            lastName="Cooper",
            username="MilesToGo",
            _password_hash="",
            age=31,
            bio="Greetings, fellow seekers! I'm Miles, an adventurer with an undying thirst for knowledge. From ancient texts to cryptic maps, I strive to uncover hidden truths and unravel historical enigmas. Join me on this quest for knowledge as we journey through the annals of time and discover the mysteries that lie beneath the surface.",
            location="Explorer's Ridge, Kentucky, USA",
            phone="+1 (859) 452-8995",
            email="miles.to.go31@gmail.com",
            profileImg="link_to_profile_image_40",
            bannerImg="link_to_banner_image_40",
            )
        
        user_28 = User(
            firstName="Zoe",
            lastName="Manning",
            username="ZestfulZoe_27",
            _password_hash="",
            age=27,
            bio="Hello, zestful souls! I'm Zoe, a lively spirit and connoisseur of all things delightful. From savoring exotic cuisines to indulging in artistic performances, I celebrate the richness of life. Join me on this zestful journey as we immerse ourselves in the flavors, colors, and melodies that make every day an adventure worth savoring.",
            location="Blissful Bistro, New York, USA",
            phone="+1 (917) 412-2578",
            email="zestful.zoe27@gmail.com",
            profileImg="https://avatarfiles.alphacoders.com/326/thumb-326097.jpg",
            bannerImg="https://images2.alphacoders.com/697/thumbbig-697196.webp",
            )
        
        user_29 = User(
            firstName="Caleb",
            lastName="Williams",
            username="SteadfastCaleb",
            _password_hash="",
            age=32,
            bio="Greetings, steadfast souls! I'm Caleb, a firm believer in perseverance and unwavering determination. From conquering mountains to facing life's challenges head-on, I find strength in resilience. Join me on this steadfast journey as we navigate the twists and turns of life, forging a path of courage and unwavering resolve.",
            location="Fortitude Valley, Arizona, USA",
            phone="+1 (602) 785-1573",
            email="steadfast_caleb32@gmail.com",
            profileImg="link_to_profile_image_42",
            bannerImg="link_to_banner_image_42",
            )
        
        user_30 = User(
            firstName="Zara",
            lastName="Knight",
            username="ZaraZephyr_28",
            _password_hash="",
            age=28,
            bio="Hello, fellow dreamers! I'm Zara, a lover of the winds and the poetry they carry. From sailing on vast oceans to dancing in meadows, I embrace the freedom that life offers. Join me on this ethereal journey as we chase the whispers of the wind and let our souls soar in its gentle caress.",
            location="Zephyr Hills, Montana, USA",
            phone="+1 (406) 912-3678",
            email="zara.zephyr28@gmail.com",
            profileImg="link_to_profile_image_43",
            bannerImg="link_to_banner_image_43",
            )
        # ]
        # db.session.add_all(users)

        #Add all users
        db.session.add(user_1)
        db.session.add(user_2)
        db.session.add(user_3)
        db.session.add(user_4)
        db.session.add(user_5)
        db.session.add(user_6)
        db.session.add(user_7)
        db.session.add(user_8)
        db.session.add(user_9)
        db.session.add(user_10)
        db.session.add(user_11)
        db.session.add(user_12)
        db.session.add(user_13)
        db.session.add(user_14)
        db.session.add(user_15)
        db.session.add(user_16)
        db.session.add(user_17)
        db.session.add(user_18)
        db.session.add(user_19)
        db.session.add(user_20)
        db.session.add(user_21)
        db.session.add(user_22)
        db.session.add(user_23)
        db.session.add(user_24)
        db.session.add(user_25)
        db.session.add(user_26)
        db.session.add(user_27)
        db.session.add(user_28)
        db.session.add(user_29)
        db.session.add(user_30)

        db.session.commit()
        #This commit handles adding the users without their passwords for the time being.
        #COMMIT INDIVIDUAL USERS, NEED TO REMOVE THEIR PASSWORDS AND ASSIGN THE BELOW.
        
        #Add user passwords (Real)
        user_1_password = 'Magic42!Paints'
        user_2_password = 'Seeker19!Wander'
        user_3_password = 'Serenade66@Scribe'
        user_4_password = 'Summit@Peaks99'
        user_5_password = 'Melody77?Singer'
        user_6_password = 'Galaxy55!Explorer'
        user_7_password = 'Pen&Traveler27"'
        user_8_password = 'Blaze99!Showtime'
        user_9_password = 'Cosmic!Traveler23'
        user_10_password = 'Trekker18?Forest'
        user_11_password = 'WanderEnchant88'
        user_12_password = 'Daredevil67!Adventurer'
        user_13_password = 'Journey22?Soulful'
        user_14_password = 'Geek&Trekker36'
        user_15_password = 'Pawprints94@Furry'
        user_16_password = 'Hiker88!Outdoors'
        user_17_password = 'Odyssey21@Explorer'
        user_18_password = 'Zen&Traveler21'
        user_19_password = 'Moonlight@Dreamer30'
        user_20_password = 'rydmoss42!Nomad'
        user_21_password = 'AstralJourney23?'
        user_22_password = 'Wilderness80&Hiker?'
        user_23_password = 'GardenVibes19!Grow'
        user_24_password = 'DiscoverWorld69'
        user_25_password = 'Explore32@Globetrot'
        user_26_password = 'Shutterbug21!Memories'
        user_27_password = 'JourneyOn50@Miles!'
        user_28_password = 'ZestLife15!Adventures'
        user_29_password = 'Persevere76?Strength'
        user_30_password = 'Breeze&Dreams25'

        #hash users passwords
        user_1.password_hash = user_1_password
        user_2.password_hash = user_2_password
        user_3.password_hash = user_3_password
        user_4.password_hash = user_4_password
        user_5.password_hash = user_5_password
        user_6.password_hash = user_6_password
        user_7.password_hash = user_7_password
        user_8.password_hash = user_8_password
        user_9.password_hash = user_9_password
        user_10.password_hash = user_10_password
        user_11.password_hash = user_11_password
        user_12.password_hash = user_12_password
        user_13.password_hash = user_13_password
        user_14.password_hash = user_14_password
        user_15.password_hash = user_15_password
        user_16.password_hash = user_16_password
        user_17.password_hash = user_17_password
        user_18.password_hash = user_18_password
        user_19.password_hash = user_19_password
        user_20.password_hash = user_20_password
        user_21.password_hash = user_21_password
        user_22.password_hash = user_22_password
        user_23.password_hash = user_23_password
        user_24.password_hash = user_24_password
        user_25.password_hash = user_25_password
        user_26.password_hash = user_26_password
        user_27.password_hash = user_27_password
        user_28.password_hash = user_28_password
        user_29.password_hash = user_29_password
        user_30.password_hash = user_30_password
        
        #Re-add all users to include passwords
        db.session.add(user_1)
        db.session.add(user_2)
        db.session.add(user_3)
        db.session.add(user_4)
        db.session.add(user_5)
        db.session.add(user_6)
        db.session.add(user_7)
        db.session.add(user_8)
        db.session.add(user_9)
        db.session.add(user_10)
        db.session.add(user_11)
        db.session.add(user_12)
        db.session.add(user_13)
        db.session.add(user_14)
        db.session.add(user_15)
        db.session.add(user_16)
        db.session.add(user_17)
        db.session.add(user_18)
        db.session.add(user_19)
        db.session.add(user_20)
        db.session.add(user_21)
        db.session.add(user_22)
        db.session.add(user_23)
        db.session.add(user_24)
        db.session.add(user_25)
        db.session.add(user_26)
        db.session.add(user_27)
        db.session.add(user_28)
        db.session.add(user_29)
        db.session.add(user_30)

        db.session.commit()
        #Adds users with their passwords hashed.

#------------------------------------------------------------------------------------------HOBBY SEEDING--------------------------------------------------------------------------------------
        print("Seeding Hobbies...")
        hobbies = [
            Hobby(
                type_of_hobby="Writing Novels",
                description="Writing novels involves creating a long, narrative piece of literature, typically divided into chapters. It requires a well-developed plot, in-depth character development, and a thorough exploration of themes and settings."
            ),
            Hobby(
                type_of_hobby="Writing Blogs",
                description="Writing blogs involves creating content for an online platform called a blog. This hobby can range from personal journaling to providing information on specific topics, and allows for the sharing and discussion of ideas on the internet."
            ),
            Hobby(
                type_of_hobby="Writing Poetry",
                description="Writing poetry is a beautiful and expressive hobby that involves crafting verses and lines to evoke emotions, share personal experiences, and explore the beauty of language. Poets use metaphors, rhythm, and vivid imagery to create meaningful and thought-provoking poems."
            ),
            Hobby(
                type_of_hobby="Photography",
                description="Photography is the art of capturing light with a camera, usually via a digital sensor or film, to create an image. With the right camera equipment, one can even capture the smallest details in stunning clarity."
            ),
            Hobby(
                type_of_hobby="Crafting",
                description="Crafting includes a wide range of activities that involve making things with one's own hands. This can include knitting, crocheting, sewing, or origami. Crafting can be a relaxing and rewarding hobby."
            ),
            Hobby(
                type_of_hobby="Pottery",
                description="Pottery involves the shaping of clay into objects, which are then fired at high temperatures to make them hard and durable. This can result in functional items like dishes, or purely decorative pieces."
            ),
            Hobby(
                type_of_hobby="Ceramics",
                description="Ceramics involves creating objects from clay and other raw materials, then hardening them by high-temperature baking. It can result in an array of items from sculptures to pottery and is distinguished by its versatility and artistic expression."
            ),
            Hobby(
                type_of_hobby="Hiking",
                description="Hiking is an outdoor activity of walking in natural environments, often on hiking trails. It's a great way to enjoy the scenery, get exercise, and possibly spot some wildlife."
            ),
            Hobby(
                type_of_hobby="Trekking",
                description="Trekking is a long, vigorous hike, usually on trails in the countryside. Trekking trips can last from several days to months and often involve navigating through remote and often hilly or mountainous areas."
            ),
            Hobby(
                type_of_hobby="Gardening",
                description="Gardening involves growing and maintaining plants as part of horticulture. This can be done for utility, for example growing fruits and vegetables, or for beauty, like growing flowers."
            ),
            Hobby(
                type_of_hobby="Birdwatching",
                description="Birdwatching involves observing birds in their natural habitats as a hobby. It's a form of wildlife observation and can be done with the naked eye, or through devices like binoculars and telescopes."
            ),
            Hobby(
                type_of_hobby="Cycling",
                description="Cycling involves riding a bicycle for transport, recreation, or exercise. It's a good form of low-impact exercise that can be enjoyed by people of all ages."
            ),
            Hobby(
                type_of_hobby="Mountain Biking",
                description="Mountain biking is a type of off-road cycling over rough terrain, using specially designed mountain bikes. It's a fun and challenging activity that requires physical stamina and good bike handling skills."
            ),
            Hobby(
                type_of_hobby="Camping",
                description="Camping involves spending time outdoors, typically overnight, in a tent or recreational vehicle. Activities may include hiking, swimming, fishing, or simply enjoying the scenery and wildlife."
            ),
            Hobby(
                type_of_hobby="Outdoor Cooking",
                description="Outdoor cooking involves preparing food outside, as in a campground or a picnic area. It can involve a range of techniques, from grilling to open-fire cooking, and can create unique flavors and experiences."
            ),
            Hobby(
                type_of_hobby="Running",
                description="Running is a method of terrestrial locomotion that allows humans and other animals to move rapidly. It's an excellent way to improve physical health, relieve stress, and enjoy the outdoors."
            ),
            Hobby(
                type_of_hobby="Jogging",
                description="Jogging is a form of running at a slow or leisurely pace with the main intention to increase physical fitness and overall health. It's a less intense form of running, and can be a good starting point for beginners."
            ),
            Hobby(
                type_of_hobby="Yoga",
                description="Yoga is a group of physical, mental, and spiritual practices that originated in ancient India. It involves a variety of postures, breathing exercises, and meditation techniques that promote flexibility, strength, and inner peace."
            ),
            Hobby(
                type_of_hobby="Pilates",
                description="Pilates is a method of exercise that consists of low-impact flexibility, muscular strength, and endurance movements. It emphasizes proper postural alignment, core strength, and muscle balance."
            ),
            Hobby(
                type_of_hobby="Dancing",
                description="Dancing involves moving rhythmically to music, often following a set sequence of steps. There are many styles of dance, including salsa, hip-hop, and ballroom, each with their unique movements and music."
            ),
            Hobby(
                type_of_hobby="Martial Arts",
                description="Martial arts are codified systems and traditions of combat practiced for various reasons such as self-defense, competition, physical health and fitness, entertainment, as well as mental, physical, and spiritual development."
            ),
            Hobby(
                type_of_hobby="Swimming",
                description="Swimming is an activity that involves moving through water using the limbs. It's a good full-body exercise, a life-saving skill, and a competitive sport."
            ),
            Hobby(
                type_of_hobby="Playing a Musical Instrument",
                description="Playing a musical instrument involves creating music using an instrument. There are a variety of instruments, such as the guitar, piano, and violin, each with its unique sound and playing technique."
            ),
            Hobby(
                type_of_hobby="Playing Guitar",
                description="Playing the guitar involves creating music with a string instrument. Guitars can have six or more strings and can be plucked or strummed to create a variety of musical styles, from rock and blues to flamenco and country."
            ),
            Hobby(
                type_of_hobby="Playing Piano",
                description="Playing the piano involves creating music by pressing keys on a piano, which is a stringed musical instrument. It's versatile and can be used for a variety of musical genres, from classical to jazz."
            ),
            Hobby(
                type_of_hobby="Playing Violin",
                description="Playing the violin involves creating music with a stringed instrument that is played with a bow. Violins are often used in a variety of musical genres, including classical, folk, and bluegrass music."
            ),
            Hobby(
                type_of_hobby="Playing Drums",
                description="Playing the drums involves creating rhythms and beats using a set of drums and cymbals. Drums are often used in a variety of musical genres, including rock, jazz, and pop music."
            ),
            Hobby(
                type_of_hobby="Playing Flute",
                description="Playing the flute involves creating music by blowing air across an opening on a tube. The flute is a woodwind instrument often used in a variety of musical genres, including classical, jazz, and folk music."
            ),
            Hobby(
                type_of_hobby="Singing",
                description="Singing involves producing musical sounds with the voice, usually by forming words. It can be performed as a form of musical expression, as a hobby, as a part of religious devotion, or as a profession."
            ),
            Hobby(
                type_of_hobby="Acting",
                description="Acting involves portraying a character in a performance, such as in a play, a movie, or on television. It requires a variety of skills, including vocal projection, clarity of speech, physical expression, and emotional understanding."
            ),
            Hobby(
                type_of_hobby="Theater",
                description="Theater involves the performance of plays or other dramatic works. It's a collaborative form of fine art that uses live performers to present a real or imagined event before an audience."
            ),
            Hobby(
                type_of_hobby="Stand-up Comedy",
                description="Stand-up comedy is a comic style where a comedian performs in front of a live audience, usually speaking directly to them. The performer is commonly known as a comic, stand-up comic, comedian, or simply a stand-up."
            ),
            Hobby(
                type_of_hobby="Improv Workshops",
                description="Improv workshops involve learning and practicing improvisation, which is a form of live theater in which the plot, characters, and dialogue are made up on the spot. It encourages creativity, spontaneity, and collaboration."
            ),
            Hobby(
                type_of_hobby="Video Gaming",
                description="Video gaming involves playing electronic games, whether through consoles, computers, mobile phones, or another medium altogether. Video games are a popular form of entertainment that ranges from casual games to professional e-sports."
            ),
            Hobby(
                type_of_hobby="Board Games",
                description="Board games involve moving pieces on a pre-marked surface or 'board' according to a set of rules. They include strategy games, chance games, and a combination of the two, and have a wide range of complexity and themes."
            ),
            Hobby(
                type_of_hobby="Tabletop Role-Playing Games",
                description="Tabletop role-playing games are a form of role-playing game (RPG) in which the participants describe their characters' actions through speech. Games often use rules and game mechanics, along with imagination and storytelling, to simulate a world in which the players' characters exist."
            ),
            Hobby(
                type_of_hobby="Coding",
                description="Coding, or programming, involves writing instructions for computers to execute. These instructions, or 'code', can create software, websites, apps, and more. It's a highly sought-after skill with a wide variety of uses."
            ),
            Hobby(
                type_of_hobby="HTML Coding",
                description="HTML, or HyperText Markup Language, is the standard markup language for documents designed to be displayed in a web browser. It's used to structure the content on the webpage and is fundamental to web development."
            ),
            Hobby(
                type_of_hobby="JavaScript Coding",
                description="JavaScript is a high-level programming language used to create and control the content of a website. It's an essential part of web development and can create dynamic and interactive elements on web pages."
            ),
            Hobby(
                type_of_hobby="React Coding",
                description="React is a JavaScript library for building user interfaces, typically for single-page applications. It allows developers to create reusable UI components and is commonly used for web and mobile applications."
            ),
            Hobby(
                type_of_hobby="Python Coding",
                description="Python is a high-level programming language known for its readability and simplicity. It's used in a variety of applications, including web development, data analysis, AI, and machine learning."
            ),
            Hobby(
                type_of_hobby="Java Coding",
                description="Java is a general-purpose, high-level programming language known for its object-oriented structure. It's used in a variety of computing platforms, from embedded devices and mobile phones to enterprise servers and supercomputers."
            ),
            Hobby(
                type_of_hobby="DIY Electronics and Robotics",
                description="DIY electronics and robotics involve creating and modifying electronic devices and robots at home. This can range from simple tasks like assembling a kit to complex projects like designing and building a robot from scratch."
            ),
            Hobby(
                type_of_hobby="Collecting Stamps",
                description="Collecting stamps, or philately, involves gathering and categorizing postage stamps, which often feature beautiful artwork or commemorate significant events or people. It's a hobby that can teach a lot about history, geography, and art."
            ),
            Hobby(
                type_of_hobby="Collecting Coins",
                description="Collecting coins, or numismatics, is the collection and study of coins, including old coins, rare coins, or coins from different countries. Coins are pieces of history, offering insights into the culture and period they originate from."
            ),
            Hobby(
                type_of_hobby="Collecting Postcards",
                description="Collecting postcards, or deltiology, involves gathering and categorizing postcards, which are often sent by people while traveling. It's a way to explore different places, cultures, and times through the images and messages on the cards."
            ),
            Hobby(
                type_of_hobby="Collecting Vintage Items",
                description="Collecting vintage items involves acquiring and preserving items from the past. These could be toys, records, books, or any number of other items. The draw for collectors is often a combination of their historical significance and nostalgic value."
            ),
            Hobby(
                type_of_hobby="Collecting Memorabilia",
                description="Collecting memorabilia involves gathering items of personal interest, such as items related to a particular sports team, movie, music band, or historical event. These items can range from clothing, posters, autographed items, to merchandise."
            ),
            Hobby(
                type_of_hobby="Collecting Art",
                description="Collecting art involves acquiring art pieces that appeal to the collector's personal aesthetics. This could include paintings, sculptures, photographs, and other forms of visual art. Art collection can also be an investment."
            ),
            Hobby(
                type_of_hobby="Collecting Antiques",
                description="Collecting antiques involves acquiring old objects, typically more than a hundred years old, which are valued for their beauty, rarity, condition, utility, personal emotional connection, and/or other unique features."
            ),
            Hobby(
                type_of_hobby="Collecting Rare Books",
                description="Collecting rare books involves gathering books that are significant due to their age, scarcity, historical importance, or other factors. These books are often highly prized and carefully preserved by collectors."
            ),
            Hobby(
                type_of_hobby="Cooking",
                description="Cooking is the art and practice of preparing food by combining various ingredients and using various methods to create delicious and nourishing dishes. Whether it's experimenting with new recipes or perfecting traditional ones, cooking is a hobby that brings joy and satisfaction to many food enthusiasts."
            ),
            Hobby(
                type_of_hobby="Baking",
                description="Baking is a method of cooking food that uses prolonged dry heat, typically in an oven. Baking, especially of breads, pastries, cakes, and other desserts, is a hobby enjoyed by many and can be quite rewarding."
            ),
            Hobby(
                type_of_hobby="Cooking International Cuisines",
                description="Cooking international cuisines involves preparing dishes from various countries and cultures. This hobby allows individuals to explore and appreciate different culinary traditions from around the world."
            ),
            Hobby(
                type_of_hobby="Food Photography",
                description="Food photography is a still life specialization of commercial photography, aimed at producing attractive photographs of food for a variety of uses including in advertisements, magazines, cookbooks, and social media."
            ),
            Hobby(
                type_of_hobby="Food Styling",
                description="Food styling is the art of arranging food so that it looks tasty and fresh. This is important in a number of fields, particularly in the advertising industry where products need to look as appealing as possible."
            ),
            Hobby(
                type_of_hobby="Brewing Beer",
                description="Brewing beer involves fermenting cereal grains to produce a carbonated, alcoholic beverage. Home brewing allows for great customization of flavors and styles, making it a popular hobby for many beer enthusiasts."
            ),
            Hobby(
                type_of_hobby="Making Wine",
                description="Making wine involves fermenting grapes or other fruits to create a unique blend of flavors. Wine making, or vinification, requires knowledge and patience, but can be an enjoyable and rewarding hobby."
            ),
            Hobby(
                type_of_hobby="BBQ and Grilling",
                description="BBQ and grilling involve cooking food on a grill or open fire. The techniques and flavors differ widely across the world, making it a versatile and sociable hobby for food lovers."
            ),
            Hobby(
                type_of_hobby="Reading Fiction Books",
                description="Reading fiction books involves immersing oneself in a narrative that originates from an author's imagination. Genres can range widely, from fantasy to thriller to romance, providing endless opportunities for enjoyment and escapism."
            ),
            Hobby(
                type_of_hobby="Reading Non-Fiction Books",
                description="Reading non-fiction books involves learning about real-world subjects from literature. This can include history, biographies, self-help, science, and more. It's a way to gain knowledge and understanding about various topics."
            ),
            Hobby(
                type_of_hobby="Book Club Participation",
                description="Book club participation involves reading books and discussing them in a group setting. It's a way to enjoy literature, share ideas, and socialize with others who share a love for books."
            ),
            Hobby(
                type_of_hobby="Writing Book Reviews",
                description="Writing book reviews involves reading a book and writing a critique of it for the benefit of others. This can include a summary of the content, an analysis of the writing style, and personal opinions about the book."
            ),
            Hobby(
                type_of_hobby="Running a Book Blog",
                description="Running a book blog involves writing about books on a blog. This could include writing reviews, conducting author interviews, and providing recommendations. It's a great hobby for avid readers who enjoy sharing their love of books with others."
            ),
            Hobby(
                type_of_hobby="Traveling",
                description="Traveling involves visiting new places, both near and far, to experience different cultures, landscapes, and activities. It provides opportunities to meet new people, try new foods, and learn about history and traditions."
            ),
            Hobby(
                type_of_hobby="Geocaching",
                description="Geocaching is an outdoor recreational activity, in which participants use a GPS receiver or mobile device to hide and seek containers, called 'geocaches' or 'caches', at specific locations marked by coordinates all over the world."
            ),
            Hobby(
                type_of_hobby="Urban Exploration",
                description="Urban exploration involves exploring manmade structures, usually abandoned ruins or not usually seen components of the urban environment. Safety and legality are important considerations for those engaged in this hobby."
            ),
            Hobby(
                type_of_hobby="Camping",
                description="Camping involves spending time outdoors, typically staying overnight in a tent, a caravan, or even under the stars. It's a way to enjoy nature and outdoor activities like hiking, fishing, and wildlife spotting."
            ),
            Hobby(
                type_of_hobby="Road Trips",
                description="Road trips involve long distance travel on the road. Whether it's a journey across the state or across the country, road trips can be a fun and flexible way to travel and see new places."
            ),
            Hobby(
                type_of_hobby="Bird Watching",
                description="Bird watching involves observing birds in their natural habitat. Bird watchers, or birders, use binoculars or telescopes to spot and identify different species, often documenting their findings in a 'life list'."
            ),
            Hobby(
                type_of_hobby="Astrology",
                description="Astrology is a belief system that suggests there is a relationship between the positions of celestial bodies and events in the human world. Many people enjoy astrology as a hobby, reading and interpreting horoscopes or natal charts."
            ),
            Hobby(
                type_of_hobby="Meditation",
                description="Meditation is a practice where an individual uses a technique such as mindfulness, or focusing their mind on a particular object, thought or activity to train attention and awareness, and achieve a mentally clear and emotionally calm and stable state."
            ),
            Hobby(
                type_of_hobby="Learning New Languages",
                description="Learning new languages involves studying the structure, vocabulary, and grammar of foreign languages. In addition to being a valuable skill, it can also be a fun hobby that allows for better understanding and appreciation of other cultures."
            ),
            Hobby(
                type_of_hobby="Learning Musical Instruments",
                description="Learning musical instruments involves practicing to play instruments such as the guitar, piano, violin, drums, or any other musical instrument. It's a skill that takes time and patience to develop but can provide a lifetime of enjoyment."
            ),
            Hobby(
                type_of_hobby="Learning Magic Tricks",
                description="Learning magic tricks involves practicing skills like sleight of hand and illusion to entertain and amaze an audience. This hobby requires patience and dexterity but can be a lot of fun to learn and perform."
            ),
            Hobby(
                type_of_hobby="Learning to Dance",
                description="Learning to dance involves mastering the movements and steps that make up a particular style of dance. Dance styles can range from ballet to salsa to hip-hop, each offering a unique way to express oneself through movement."
            ),
            Hobby(
                type_of_hobby="Learning Calligraphy",
                description="Learning calligraphy involves practicing the art of writing in an expressive, beautiful, and skillful manner. Calligraphy requires steady hands and patience, but can be a relaxing and rewarding hobby."
            ),
            Hobby(
                type_of_hobby="Learning Pottery",
                description="Learning pottery involves creating objects from clay and other ceramic materials, which are then fired at high temperatures to become pottery. It's a creative hobby that can result in beautiful, functional art pieces."
            ),
            Hobby(
                type_of_hobby="Singing",
                description="Singing involves producing musical sounds with the voice, usually to accompany a song. Singing can be done professionally or as a hobby and can be enjoyed solo or with others in a choir or band."
            ),
            Hobby(
                type_of_hobby="Painting",
                description="Painting involves applying paint to a medium (such as canvas or paper) to create an artwork. There are various styles and techniques of painting, making it a versatile and creative outlet."
            ),
            Hobby(
                type_of_hobby="Drawing",
                description="Drawing involves making pictures by making lines on paper, or other surfaces. It can be a simple hobby to start, but with time and practice, many people can develop their skills to produce stunning artworks."
            ),
            Hobby(
                type_of_hobby="Knitting",
                description="Knitting involves creating a fabric or textile by creating interlocking loops of yarn. It's a hobby that can be picked up by almost anyone and can result in everything from blankets to sweaters to stuffed animals."
            ),
            Hobby(
                type_of_hobby="Crocheting",
                description="Crocheting involves creating a fabric by interlocking loops of yarn or thread with a crochet hook. Like knitting, crocheting can result in a variety of handmade items like doilies, scarves, and hats."
            ),
            Hobby(
                type_of_hobby="Sewing",
                description="Sewing involves fastening or attaching objects using stitches made with a needle and thread. It's a practical hobby that can be used to make, mend, or alter clothes and other items."
            ),
            Hobby(
                type_of_hobby="Embroidery",
                description="Embroidery involves decorating fabric or other materials using a needle to apply thread or yarn. It's a hobby that can be as simple or complex as the pattern demands, and it's often used to personalize clothing, linens, and wall hangings."
            ),
            Hobby(
                type_of_hobby="Gardening",
                description="Gardening involves the cultivation and care of plants. This can include flowers, vegetables, fruits, herbs, or decorative plants. Gardening can be a relaxing and rewarding outdoor activity."
            ),
            Hobby(
                type_of_hobby="Landscaping",
                description="Landscaping involves the planning, design, and maintenance of outdoor spaces. This can include plant selection and placement, pathway design, and other aesthetic decisions. It's a more large-scale and intricate hobby than gardening."
            ),
            Hobby(
                type_of_hobby="Composting",
                description="Composting involves collecting organic waste (like food scraps and lawn clippings) and letting it decompose over time. The result is nutrient-rich soil that can be used in gardening. It's a practical hobby that's good for the environment."
            ),
            Hobby(
                type_of_hobby="Urban Farming",
                description="Urban farming involves growing food in cities, often in small spaces like balconies, rooftops, or indoor gardens. It's a hobby that can provide fresh, local food and promote sustainable living."
            ),
            Hobby(
                type_of_hobby="Keeping Bees",
                description="Keeping bees, or beekeeping, involves the maintenance of bee colonies, usually in hives. It's a hobby that can provide honey and promote the pollination of nearby plants."
            ),
            Hobby(
                type_of_hobby="Fishing",
                description="Fishing involves catching fish, either as a profession, for survival, or for sport. As a hobby, it's a relaxing outdoor activity that can also provide an opportunity to catch a meal."
            ),
            Hobby(
                type_of_hobby="Hunting",
                description="Hunting involves tracking and killing animals, either for food, for sport, or for trade. It's a hobby that requires knowledge of animals and their behaviors, outdoor survival skills, and shooting skills."
            ),
            Hobby(
                type_of_hobby="Surfing",
                description="Surfing involves riding waves on a board, either standing up, lying down, or kneeling. It's a physically demanding hobby that also offers adrenaline and a close connection to nature."
            ),
            Hobby(
                type_of_hobby="Food Drive Participation",
                description="Participating in food drives involves collecting and donating food to support local communities, particularly those dealing with food insecurity. This typically includes gathering non-perishable food items and delivering them to a central location. It's a community-oriented hobby that directly helps those in need and can raise awareness about food security issues."
            ),
            Hobby(
                type_of_hobby="Volunteering",
                description="Volunteering involves donating one's time and energy to support a cause or organization without expecting monetary compensation. This can take many forms, from helping at local charities or community events, supporting environmental initiatives, to aiding educational programs. It provides an opportunity to give back to the community, develop new skills, and make social connections."
            ),
        ]
        db.session.add_all(hobbies)
        db.session.commit()

#---------------------------------------------------------------------------------USERS HOBBIES-----------------------------------------------------------------------------------------------
#print some of these can defnitely have extra things
        print("Seeding our existing Users hobbies...")
        user_hobbies = [
            UserHobby(expertise=9, user_id=user_1.id, hobby_id=hobbies[79].id),   # Emily Everwood - Painting ✔
            UserHobby(expertise=7, user_id=user_2.id, hobby_id=hobbies[8].id),   # Zephyr Wilde - Adventuring - Trekking ✔
            UserHobby(expertise=5, user_id=user_3.id, hobby_id=hobbies[0].id),   # Seren Hawthorne - Writing - Writing Novels ✔ 
            UserHobby(expertise=8, user_id=user_4.id, hobby_id=hobbies[8].id),   # Atlas Stone - Mountain Exploration - Trekking ✔
            UserHobby(expertise=6, user_id=user_5.id, hobby_id=hobbies[30].id),   # Aria Nightingale - Music - Theater ✔
            UserHobby(expertise=9, user_id=user_6.id, hobby_id=hobbies[70].id),   # Max Adler - Astronomy - Astrology ✔
            UserHobby(expertise=4, user_id=user_7.id, hobby_id=hobbies[59].id),   # Eliza Bard - Reading Fiction Books ✔
            UserHobby(expertise=7, user_id=user_8.id, hobby_id=hobbies[19].id),   # Phoenix Blaze - Fire Dancing - Dancing ✔
            UserHobby(expertise=8, user_id=user_9.id, hobby_id=hobbies[70].id),   # Stella Morgan - Astronomy - Astrology✔
            UserHobby(expertise=5, user_id=user_10.id, hobby_id=hobbies[8].id),   # Asher Kane - Hiking - Trekking
            UserHobby(expertise=6, user_id=user_11.id, hobby_id=hobbies[3].id),  # Ivy Greene - Photography ✔
            UserHobby(expertise=4, user_id=user_12.id, hobby_id=hobbies[12].id),  # Carter Reeves - Adrenaline Activities - Mountain Biking	 ✔
            UserHobby(expertise=5, user_id=user_13.id, hobby_id=hobbies[71].id),  # Jasmine Hart - Mindfulness - Meditation (add yoga 18) ✔
            UserHobby(expertise=8, user_id=user_14.id, hobby_id=hobbies[36].id),  # Oliver Hudson - Technology - Coding ✔
            UserHobby(expertise=6, user_id=user_15.id, hobby_id=hobbies[94].id),  # Ava Morgan - Animal Welfare - Volunteering ✔
            UserHobby(expertise=9, user_id=user_16.id, hobby_id=hobbies[7].id),  # Ash Hunter - Nature - Hiking ✔
            UserHobby(expertise=3, user_id=user_17.id, hobby_id=hobbies[49].id),  # Ari James - History - Collecting Antiques ✔
            UserHobby(expertise=7, user_id=user_18.id, hobby_id=hobbies[71].id),  # Aiden Hartman - Mindfulness - Meditation ✔
            UserHobby(expertise=5, user_id=user_19.id, hobby_id=hobbies[70].id),  # Luna Knight - Astronomy - Astrology✔
            UserHobby(expertise=4, user_id=user_20.id, hobby_id=hobbies[64].id),  # Ryder Moss - Travel - Traveling ✔
            UserHobby(expertise=8, user_id=user_21.id, hobby_id=hobbies[70].id),  # Nova Sullivan - Stargazing - Astrology✔
            UserHobby(expertise=6, user_id=user_22.id, hobby_id=hobbies[8].id),   # Silas Rivera - Nature - Trekking✔
            UserHobby(expertise=3, user_id=user_23.id, hobby_id=hobbies[9].id),  # Ivy Lawrence - Gardening ✔
            UserHobby(expertise=5, user_id=user_24.id, hobby_id=hobbies[2].id),   # Zoe Harrison - Poetry - Writing Poetry	✔
            UserHobby(expertise=7, user_id=user_25.id, hobby_id=hobbies[64].id),  # Finn Collins - Travel - Traveling ✔
            UserHobby(expertise=6, user_id=user_26.id, hobby_id=hobbies[3].id),   # Lila Morris - Photography ✔
            UserHobby(expertise=8, user_id=user_27.id, hobby_id=hobbies[46].id),  # Miles Cooper - History - Vintage Items✔
            UserHobby(expertise=3, user_id=user_28.id, hobby_id=hobbies[53].id),  # Zoe Manning - Culinary Exploration - Cooking International Cuisines	 ✔
            UserHobby(expertise=5, user_id=user_29.id, hobby_id=hobbies[8].id),   # Caleb Williams - Resilience - Trekking ✔
            UserHobby(expertise=7, user_id=user_30.id, hobby_id=hobbies[2].id),  # Zara Knight - Poetry - Writing Poetry ✔
        ]
        db.session.add_all(user_hobbies)
        db.session.commit()

#---------------------------------------------------------------------------------COMPETITIONS-----------------------------------------------------------------------------------------------
        print("Seeding our Competitions...")
        competitions = [
            Competition(
                title="Trail of Ten Falls Trekking Challenge",
                objective="The objective of this competition is to test participants' trekking abilities, endurance, and appreciation for nature as they explore the Trail of Ten Falls in Silver Falls State Park.",
                description="Participants will form teams of 3 and undertake an unforgettable trekking adventure along the Trail of Ten Falls. The trail will showcase the park's breathtaking waterfalls and offer participants a chance to immerse themselves in the beauty of Oregon's lush wilderness. Unleash your trekking prowess in the Trail of Ten Falls Challenge! Embark on an enchanting journey through lush landscapes and captivating waterfalls. Join us for an unforgettable trek where every step sparks wonder and every moment is pure magic. Ready to embrace the trail's beauty? Let's trek together and create lasting memories!",
                compImg = "https://www.oregonlive.com/resizer/4Ppj7w0bVRairNLOtuigcs5nAmY=/1280x0/smart/advancelocal-adapter-image-uploads.s3.amazonaws.com/image.oregonlive.com/home/olive-media/width2048/img/travel_impact/photo/waterfalls-of-silver-falls-state-park-44de1639dcf7dd0d.jpg",
                scoring="Teams will earn points based on their performance in each task. The team with the highest overall score at the end of the competition will be declared the winner.",
                schedule="",
                contact="",
                location="Silver Falls State Park, Oregon, United States",
                requirements="",
                competition_tasks="1. Checkpoint Navigation: Each team will be provided with a map and a list of checkpoints corresponding to the ten waterfalls along the trail. Teams must navigate their way to each waterfall checkpoint in sequential order. Navigation skills and map reading will be crucial. 2. Waterfall Exploration: At each waterfall checkpoint, teams will have to complete a task related to the specific waterfall. Tasks may include taking a group photo in front of the waterfall, identifying unique features of the falls, or answering questions about the waterfall's history. 3. Environmental Awareness: Throughout the trek, teams will be evaluated on their adherence to environmental ethics, including 'Leave No Trace'principles. They should demonstrate respect for the park's natural beauty and wildlife. 4. Nature Trivia: Along the trail, teams will encounter educational boards with information about the flora, fauna, and geology of the area. A nature-themed quiz will be conducted, testing participants' knowledge of the local ecosystem. 5.Photography Challenge: Participants will be encouraged to capture the stunning scenery and waterfalls through photography. They can submit their best shots at the end of the competition, and the most captivating photographs will be rewarded.",
                safety_measures="1. All participants must undergo a health check and be in good physical condition. 2. Each team must have a designated team leader responsible for the safety of the team members. 3. Participants should dress appropriately for the weather and carry essentials such as water, snacks, and a first aid kit.",
                prize1="Grand Prize: The winning team will receive a top-of-the-line Osprey Atmos AG 65 backpack, renowned for its exceptional comfort and ample storage space for multi-day treks.",
                prize2="Second Place: The second-place team will be rewarded a pair of Salomon X Ultra 3 Mid GTX hiking boots. These high-performance boots offer excellent support, durability, and comfort, making them the perfect choice for conquering challenging terrains like the Trail of Ten Falls.",
                prize3="Third Place: The third-place team will receive a set of premium Black Diamond Trail Ergo Cork trekking poles, providing enhanced stability and reducing strain during long hikes.",
                prize4="Fourth Place: The fourth-place team will be granted $100 cash prize, recognizing their dedication and enthusiasm in conquering the Trail of Ten Falls.",
                prize5="Fifth Place: The fifth-place team will be awarded $75 cash prize, celebrating their strong performance and commitment to the challenge.",
                prize6="Sixth Place: The sixth-place team will receive $50 cash prize, acknowledging their resilience and spirit in tackling the trail's obstacles.",
                prize7="Seventh Place: The seventh-place team will be granted a $25 outdoor gear voucher, allowing them to choose equipment or accessories to enhance their future trekking adventures.",
                prize8="Eighth Place: The eighth-place team will receive a $20 outdoor gear voucher, providing them with an opportunity to acquire quality gear for their outdoor pursuits.",
                registration_schedule="Participants can register for the competition through [provide registration details]. The number of teams may be limited, so early registration is encouraged.", # need a way to grab date
                user_id = user_22.id,
            ),
            Competition(
                title="Celestial Explorer Challenge",
                objective="Embark on a captivating journey of astronomical discovery as an individual participant, where you will showcase your profound knowledge of the cosmos, hone your keen stargazing skills, and immerse yourself in the awe-inspiring beauty of the night sky through a series of celestial tasks and challenges under the twinkling canopy above.",
                description="In the Celestial Explorer Challenge, you will become a lone adventurer under the stars, navigating the mysteries of the cosmos with zeal and curiosity. This competition is tailored for individual stargazers who seek to deepen their understanding of astronomy, test their powers of observation, and capture the essence of the night sky through enthralling challenges and astronomical quests. Indulge your passion for the stars, and let the Celestial Explorer Challenge elevate your love for astronomy to new celestial heights!",
                compImg = "https://www.daysoftheyear.com/wp-content/uploads/astronomy-day1.jpg",
                scoring="Your performance in each task will be scored, and the individual participant with the highest overall score at the end of the Celestial Explorer Challenge will claim the title of the night's most accomplished stargazer.",
                schedule="",
                contact="",
                location="BIG BEND NATIONAL PARK, TEXAS",
                requirements="",
                competition_tasks="1. Stargazing Quest: Armed with a sky chart or a list of celestial wonders, you will embark on a personal quest to discover and observe awe-inspiring phenomena, such as planets, stars, constellations, and captivating deep-sky objects, all while forging a profound connection with the vast expanse above. 2. Night Sky Challenges: Encounter enchanting astronomy-related challenges throughout the night, designed to invigorate your intellect and imagination. From identifying elusive stars and constellations without visual aids to unraveling enigmatic astronomical puzzles, each challenge will spark the thrill of cosmic exploration. 3. Astronomy Trivia: Demonstrate your astronomical acumen in a knowledge-based quiz that spans the breadth of space exploration, from celestial bodies and galactic phenomena to the rich history of astronomical discovery and the brilliant minds who shaped our understanding of the universe. 4. Astrophotography Task: Capture the ephemeral beauty of the cosmos through your lens, showcasing your artistic flair in astrophotography. Freeze time with long-exposure shots of the night sky or capture the delicate details of celestial wonders through telescopic photography, leaving a visual legacy of your cosmic odyssey.",
                safety_measures="1. Strict adherence to safety guidelines and precautions for stargazing activities is paramount, ensuring that every Celestial Explorer enjoys the night sky responsibly and securely. 2. All participants must use flashlights equipped with red filters to preserve night vision during the competition.",
                prize1="Grand Prize: The participant achieving the highest overall score will be awarded a high-quality Orion StarBlast 6 Astro Reflector Telescope. With its 6-inch aperture and sturdy tabletop design, this telescope provides excellent views of the Moon, planets, and deep-sky objects. The StarBlast 6 is perfect for both beginners and experienced astronomers, making it an ideal companion for exploring the wonders of the night sky.",
                prize2="The second-highest scoring participant will receive a generous monetary compensation of $300, in recognition of their exceptional astronomical prowess and dedication.",
                prize3="The third-place participant will be awarded $200, celebrating their outstanding achievements and passion for astronomy.",
                prize4="Fourth Place Prize: A reward of $150 awaits the fourth-place participant, acknowledging their dedication and enthusiasm in navigating the celestial realm.",
                prize5="Fifth Place Prize: The fifth-place participant will receive $100, recognizing their commitment to stargazing and astronomical exploration.",
                prize6="Sixth Place Prize: A prize of $75 will be granted to the sixth-place participant, commending their celestial quest and astronomical knowledge.",
                prize7="Seventh Place Prize: With a reward of $50, the seventh-place participant will be celebrated for their engagement in the cosmos and their astronomical feats.",
                prize8="Eighth Place Prize: The eighth-place participant will receive $25, honoring their passion for stargazing and commitment to the competition.",
                registration_schedule="Secure your place in the Celestial Explorer Challenge by registering through [provide registration details]. Limited slots are available, so secure your spot early to join this cosmic quest of a lifetime.", # need a way to grab date
                user_id = user_6.id,
            ),
            Competition(
                title="Virtual Culinary Showdown",
                objective="Unleash your culinary prowess and embark on a thrilling gourmet adventure as you participate in the Virtual Culinary Showdown! This online cooking competition aims to celebrate the art of cooking, ignite culinary creativity, and bring together passionate home chefs in a virtual culinary spectacle.",
                description="Welcome to the sizzling world of the Virtual Culinary Showdown, where kitchen virtuosos from all corners of the culinary universe will converge for a mouthwatering and immersive experience. In this online cooking extravaganza, participants will embark on a gastronomic journey that transcends geographical boundaries as they showcase their culinary skills and innovative flair, all from the comfort of their own kitchens. In the culinary theater, the virtual audience becomes an integral part of the spectacle! Through real-time comments, questions, and votes, spectators will engage with the passionate chefs, savoring the excitement and camaraderie of the Virtual Culinary Showdown. During the live stream, the virtual audience will have the opportunity to engage with the participants through real-time comments, questions, and votes for their favorite dishes. The Virtual Culinary Showdown promises to be an engaging and flavorful experience, celebrating the love of cooking and culinary artistry with a wide range of prizes for the talented participants!",
                compImg = "https://media.philstar.com/photos/2023/01/28/000337n9ck_2023-01-28_09-52-17.jpg",
                scoring="Dedicated judges will assess participants' culinary feats in each challenge, and a delectable blend of taste, technique, and presentation will be rewarded. The participant who reigns supreme with the highest overall score at the end of the Virtual Culinary Showdown will be crowned the culinary virtuoso.",
                schedule="",
                contact="",
                location="Online (Participants will cook from their respective kitchens)",
                requirements="",
                competition_tasks="1. Signature Dish Challenge: Ignite the flames of creativity and culinary finesse as each participant presents their show-stopping 'Signature Dish.' With the spotlight on their unique culinary styles and inventive flavors, participants will unravel the secrets of their gastronomic masterpieces during the live-streamed showdown. 2. Mystery Ingredient Round: Thrills await in the Mystery Ingredient Round! As the culinary maestros compete against the clock, they must ingeniously incorporate a surprise ingredient into their dishes, impressing the virtual audience with their culinary dexterity and resourcefulness. 3. Plating and Presentation: A feast for the eyes! As taste buds savor the delectable creations, participants will be challenged to elevate their culinary artistry through captivating plating and presentation. Each dish becomes a canvas, where culinary expression meets visual brilliance. 4. Cooking Demonstration: Engage, inspire, and captivate! Throughout the competition, participants will take center stage, demonstrating their culinary prowess step-by-step. Their explanations will tantalize the virtual audience, whisking them away on a culinary adventure from the comfort of their screens.",
                safety_measures="To participate in the Virtual Culinary Showdown, participants must have access to a stable internet connection and a device (computer, tablet, or smartphone) with a working camera and microphone.",
                prize1="Grand Prize: The culinary champion will receive a coveted high-end kitchen appliance, such as a professional-grade chef's knife set or a top-of-the-line stand mixer, empowering them to continue crafting culinary excellence.",
                prize2="Second Place: The runner-up will be honored with a gourmet cooking class or a premium selection of exotic spices and culinary ingredients, adding new dimensions to their culinary journey.",
                prize3="Third Place: The esteemed third-place participant will receive a gift card to a renowned culinary supply store, inviting them to explore and enhance their kitchen arsenal.",
                prize4="Fourth Place: The fourth-place participant will be granted a $150 cash prize, appreciating their culinary talent and dedication.",
                prize5="Fifth Place: The fifth-place participant will receive a $100 cash prize, celebrating their culinary achievements and passion for cooking.",
                prize6="Sixth Place: The sixth-place participant will be awarded a $75 cash prize, recognizing their skill and creativity in the kitchen.",
                prize7="Seventh Place: The seventh-place participant will receive a $50 cash prize, honoring their efforts and culinary expertise.",
                prize8="Eighth Place: The eighth-place participant will be granted a $25 gift card to a popular online gourmet food store, allowing them to explore and indulge in gourmet ingredients and culinary delights.",
                registration_schedule="Participants can register for the competition through [provide registration details]. The number of participants may be limited, so early registration is encouraged.", # need a way to grab date
                user_id = user_28.id,
            ),
            Competition(
                title="Coastal Serenity Art Challenge",
                objective="Unleash the power of your creativity and immerse yourself in the captivating allure of coastal landscapes with the Coastal Serenity Art Challenge! This inspiring competition invites artists of all backgrounds to celebrate the tranquil beauty of beaches through their artistic expressions, capturing the essence of serenity that resonates with these idyllic seascapes.",
                description="Welcome to the Coastal Serenity Art Challenge, where the mesmerizing harmony of sun-kissed shores and glistening waters serves as the muse for artistic brilliance. Against a backdrop of virtual camaraderie, participants will embark on an artistic odyssey, embracing the essence of coastal serenity through their unique perspectives and strokes of genius. The virtual art gallery will be a captivating spectacle, adorned with an array of coastal-inspired creations. As the competition unfolds, spectators and fellow artists will wander through this digital haven, savoring the captivating narratives woven into each artwork. Let your creativity wash ashore and be swept away by the Coastal Serenity Art Challenge, where the tranquil beauty of beaches becomes a canvas for artistic masterpieces!",
                compImg = "https://images.saatchiart.com/saatchi/1649865/art/8400046/7464383-HSC00001-7.jpg",
                scoring="Esteemed art connoisseurs will evaluate the artworks, guided by an appreciation for technique, composition, originality, and the ability to evoke the serene spirit of beaches. The artist with the highest overall score at the end of the Coastal Serenity Art Challenge will be hailed as the coastal artist extraordinaire.",
                schedule="",
                contact="",
                location="Virtual (Participants will paint from their own studios or creative spaces)",
                requirements="",
                competition_tasks="1. Beachscape Masterpiece: With the caress of brushstrokes or the dance of colors on canvas, participants will craft their magnum opus—a 'Beachscape Masterpiece.' Each artist will capture the ever-changing beauty of beaches, from the gentle ebb and flow of tides to the whispers of ocean breeze, allowing viewers to be transported to the tranquil realms of coastal bliss. 2. Seaside Elements: Dive into the intricacies of coastal life! In this segment, artists will focus on the captivating details of seaside elements—seashells, seagulls, palm fronds, or driftwood. Each brushstroke or pencil mark will bring these coastal treasures to life, revealing the profound connections between art and nature. 3. Sunset Horizons: As the sun dips below the horizon, artists will find inspiration in the enchanting allure of beach sunsets. With the interplay of colors and light, participants will capture the ethereal moments when the sky and ocean unite in a symphony of breathtaking hues. 4. Artistic Process Showcase: Within the virtual realm, artists will open their creative sanctuaries, showcasing their artistic processes through time-lapse videos or live demonstrations. Witness the magic as visions take shape, revealing the heart and soul of each artwork.",
                safety_measures="To participate in the Coastal Serenity Art Challenge, participants must have access to a stable internet connection and a device (computer, tablet, or smartphone) with a working camera and microphone.",
                prize1="Grand Prize: The art virtuoso who claims the top spot will be awarded a deluxe artist's set, comprising premium-quality paints, brushes, canvases, and other art supplies to elevate their artistic endeavors.",
                prize2="Second Place: The runner-up will receive a gift card to a renowned art supply store, offering them the opportunity to expand their art materials collection and explore new artistic horizons.",
                prize3="Third Place: The esteemed third-place artist will be granted a stipend to attend a coastal art workshop or retreat, where they can further hone their skills and find inspiration in picturesque seaside settings.",
                prize4="Fourth Place: The fourth-place artist will be granted a $150 cash prize, acknowledging their artistic talent and dedication to capturing coastal serenity.",
                prize5="Fifth Place: The fifth-place artist will receive a $100 cash prize, celebrating their artistic achievements and passion for painting beaches.",
                prize6="Sixth Place: The sixth-place artist will be awarded a $75 cash prize, recognizing their artistic skill and creativity.",
                prize7="Seventh Place: The seventh-place artist will receive a $50 cash prize, honoring their efforts and artistic expression.",
                prize8="Eighth Place: The eighth-place artist will be granted a $25 art supply voucher, allowing them to acquire additional tools and materials to nurture their artistic visions.",
                registration_schedule="Artists can register for the competition through [provide registration details]. The number of participants may be limited, so early registration is encouraged.", # need a way to grab date
                user_id = user_1.id,
            ),
            Competition(
                title="Captured Visions Photography Contest",
                objective="Embark on a thrilling visual expedition and unleash the magic of your lens in the Captured Visions Photography Contest! This captivating competition invites photographers of all levels to explore the boundless realms of creativity and showcase their unique perspectives, encapsulating the essence of captivating moments frozen in time.",
                description="Welcome to the Captured Visions Photography Contest, where the world becomes your canvas, and your camera becomes the brush that paints unforgettable images. In this artistic journey, photographers will delve into their passion for storytelling through imagery, capturing fleeting emotions, arresting landscapes, and life's hidden treasures. Through the digital realm, the virtual photography gallery will come alive, showcasing the entrancing collection of captivating photographs. Spectators and fellow photographers will stroll through this immersive gallery, celebrating the richness of visual storytelling.  Unleash the power of your lens and embark on an extraordinary journey of visual storytelling in the Captured Visions Photography Contest, where moments are immortalized, and emotions become art!",
                compImg = "https://dvyvvujm9h0uq.cloudfront.net/com/articles/1647932770-marco-xu-toupbco62lw-unsplash.jpg",
                scoring="A panel of expert photographers and art connoisseurs will judge the entries based on technical excellence, composition, creativity, and the ability to convey powerful emotions and narratives through the lens. The photographer with the highest overall score at the end of the Captured Visions Photography Contest will be celebrated as the visionary image-maker.",
                schedule="",
                contact="",
                location="Global (Participants will submit their photographs online)",
                requirements="",
                competition_tasks="1. Emotive Portraits: Participants will focus on creating captivating portraits that evoke emotions, personalities, and untold stories. Showcase the power of human connections and the art of portraiture to bring out the essence of the subjects. 2. Nature's Symphony: In this task, photographers will venture into nature's embrace, capturing the symphony of colors, textures, and life found in landscapes, forests, rivers, and other natural settings. Unleash the beauty of the great outdoors through your lens. 3. Street Life Chronicles: Embrace the bustling energy of urban landscapes in this task. Capture candid moments and fleeting encounters that narrate the essence of street life, documenting the cultural fabric and dynamic stories of cityscapes. 4. Macro Wonders: Through macro photography, explore the fascinating microcosms that often go unnoticed by the naked eye. From tiny insects to delicate flora, unveil the intricate wonders hidden in the details.",
                safety_measures="To participate in the Captured Visions Photography Contest, participants must have access to a stable internet connection and a device (computer, tablet, or smartphone) with a working camera and microphone.",
                prize1="Grand Prize: The photographic virtuoso who claims the top spot will be awarded a top-of-the-line professional DSLR camera, unlocking new possibilities for their future visual journeys.",
                prize2="Second Place: The runner-up will receive a high-quality camera lens or photography equipment that complements their photographic artistry.",
                prize3="Third Place: The esteemed third-place photographer will be granted a stipend to attend a photography workshop or expedition to refine their craft and find inspiration in new horizons.",
                prize4="Fourth Place: The fourth-place photographer will be granted a $150 cash prize, acknowledging their exceptional talent and dedication to capturing extraordinary moments.",
                prize5="Fifth Place: The fifth-place photographer will receive a $100 cash prize, celebrating their artistic achievements and passion for visual storytelling.",
                prize6="Sixth Place: The sixth-place photographer will be awarded a $75 cash prize, recognizing their technical skill and creativity in capturing captivating images.",
                prize7="Seventh Place: The seventh-place photographer will receive a $50 cash prize, honoring their efforts and artistic vision.",
                prize8="Eighth Place: The eighth-place photographer will be granted a $25 photography gear voucher, allowing them to enhance their photographic arsenal.",
                registration_schedule="Photographers can submit their captivating images through [provide submission details]. Each participant may enter photographs for one or more of the competition tasks.", # need a way to grab date
                user_id = user_11.id,
            ),
            Competition(
                title="Strum and Show Guitar Challenge",
                objective="Tune your passion and skill to the perfect rhythm in the Strum and Show Guitar Challenge! This dynamic competition invites guitarists of all styles and levels to showcase their musicality, stage presence, and captivating performances, inspiring audiences with the magic of their melodies.",
                description="Welcome to the Strum and Show Guitar Challenge, where every strum is a brushstroke, and every note paints a vibrant sonic canvas. This thrilling contest provides a stage for guitarists to unleash their musical creativity, energizing the audience with heartfelt tunes and electrifying performances. The Strum and Show Guitar Challenge will host a virtual showcase, allowing audiences to revel in the captivating performances of all participants. Virtual viewers will be immersed in a musical feast, celebrating the artistry and passion of each guitarist. Step into the spotlight and let your guitar prowess shine in the Strum and Show Guitar Challenge, where strings resonate, fingers dance, and music becomes an unforgettable experience!",
                compImg = "https://e1.pxfuel.com/desktop-wallpaper/404/249/desktop-wallpaper-buckethead-guitar-guitarist-heavy-metal-progressive-funk-avant-buckethead-guitar-music.jpg",
                scoring="A panel of music experts, seasoned performers, and audience participation will contribute to the scoring process. They will evaluate technical skills, musicality, stage presence, originality, and the ability to engage the audience. The guitarist with the highest overall score at the end of the Strum and Show Guitar Challenge will be crowned the Guitar Maestro.",
                schedule="",
                contact="",
                location="Global (Participants will submit their entries online)",
                requirements="",
                competition_tasks="1. Solo Showcase: In this task, guitarists will take center stage to deliver a soul-stirring solo performance, showcasing their technical finesse, expressive playing, and ability to communicate through the strings. 2. Genre Fusion Frenzy: Participants will push the boundaries of genres in this task, creating exciting fusion performances that blend different styles, bridging the gap between musical worlds and inspiring new harmonies. 3. Stagecraft Brilliance: In this task, guitarists will not only play with brilliance but also dazzle the audience with captivating stagecraft. Participants will incorporate visual effects, dynamic movements, or theatrical elements to enhance their performances. 4. Harmony Jam: Collaboration is the key in this task. Guitarists will team up with other musicians to create an enchanting musical journey, demonstrating the power of harmonious collaboration.",
                safety_measures="To participate in the Strum and Show Guitar Challenge, participants must have access to a stable internet connection and a device (computer, tablet, or smartphone) with a working camera and microphone.",
                prize1="Grand Prize: The Guitar Maestro will receive a high-end, custom-designed guitar, tailor-made to complement their unique playing style and artistic vision.",
                prize2="Second Place: The runner-up will be awarded a premium guitar effects pedal board, elevating their sonic possibilities and creativity.",
                prize3="Third Place: The esteemed third-place guitarist will be granted a stipend to attend a renowned guitar workshop or masterclass, unlocking new dimensions of musical excellence.",
                prize4="Fourth Place: The fourth-place guitarist will be granted a $150 cash prize, recognizing their exceptional talent and dedication to their craft.",
                prize5="Fifth Place: The fifth-place guitarist will receive a $100 cash prize, celebrating their musical achievements and passion for guitar playing.",
                prize6="Sixth Place: The sixth-place guitarist will be awarded a $75 cash prize, acknowledging their technical skill and captivating performances.",
                prize7="Seventh Place: The seventh-place guitarist will receive a $50 cash prize, honoring their efforts and musical expression.",
                prize8="Eighth Place: The eighth-place guitarist will be granted a $25 gift card to a popular music store, allowing them to explore and expand their guitar gear collection.",
                registration_schedule="Guitarists can register for the competition through [provide registration details]. Spaces may be limited, so early registration is encouraged.", # need a way to grab date
                user_id = user_5.id,
            ),
            Competition(
                title="ElectraTech Maker Challenge",
                objective="Spark your ingenuity and technical prowess in the ElectraTech Maker Challenge! This electrifying competition invites DIY electronics and robotics enthusiasts to showcase their innovative creations, tinkering skills, and transformative designs that push the boundaries of technology.",
                description="Welcome to the ElectraTech Maker Challenge, where circuits come alive, and robots dance to the rhythm of innovation. This thrilling contest provides a platform for makers, DIY enthusiasts, and robotics wizards to demonstrate their technical prowess, creative problem-solving, and passion for cutting-edge technology.   The ElectraTech Maker Challenge will host a virtual exhibition to showcase the projects of all participants. Enthusiasts and aspiring tech makers will explore this digital gallery, celebrating the marvels of technology and creativity. Ignite your passion for innovation and join the ElectraTech Maker Challenge, where creativity sparks, robots conquer, and technology transforms the world!",
                compImg = "https://ichef.bbci.co.uk/images/ic/1200x675/p040qmt5.jpg",
                scoring="A panel of technology experts, electronics engineers, and robotics enthusiasts will contribute to the scoring process. They will evaluate project complexity, technical sophistication, innovation, and the impact of the projects on society. The participant with the highest overall score at the end of the ElectraTech Maker Challenge will be crowned the ElectraTech Innovator. The ElectraTech Maker Challenge will host a virtual exhibition to showcase the projects of all participants. Enthusiasts and aspiring tech makers will explore this digital gallery, celebrating the marvels of technology and creativity.",
                schedule="",
                contact="",
                location="Virtual (Participants will work from their own workshops or creative spaces)",
                requirements="",
                competition_tasks="1. RoboMachina Showcase: In this task, participants will exhibit their self-designed robots or robotic projects, demonstrating their functionality, efficiency, and unique features. Robots can be autonomous, remote-controlled, or programmed using cutting-edge AI. 2. ElectroCraft Wonders: Makers will showcase their innovative electronics projects, which could include custom-built gadgets, IoT devices, electronic wearables, or home automation systems, highlighting how they enhance and simplify daily life. 3. TechBreakthrough Design: In this task, participants will present their groundbreaking designs or inventions that offer ingenious solutions to real-world challenges. Projects may range from renewable energy solutions to assistive technology for individuals with disabilities. 4. DIY Robotics Challenge: Participants will compete in an exciting robotics challenge, where they will construct robots capable of completing specific tasks within a set timeframe. The challenge will test participants' engineering skills, robotics know-how, and quick problem-solving abilities.",
                safety_measures="To participate in the ElectraTech Maker Challenge, participants must have access to a stable internet connection and a device (computer, tablet, or smartphone) with a working camera and microphone.",
                prize1="The ElectraTech Innovator will receive a state-of-the-art electronics and robotics kit, equipped with advanced components to fuel their future inventions and innovations.",
                prize2="Second Place: The runner-up will be awarded a high-quality soldering station and toolset, empowering them to tackle intricate electronic projects with precision.",
                prize3="Third Place: The esteemed third-place participant will be granted a stipend to attend a prestigious technology workshop or conference, exploring new realms of knowledge and networking.",
                prize4="Fourth Place: The fourth-place participant will be granted a $150 cash prize, acknowledging their exceptional talent and dedication to DIY electronics and robotics.",
                prize5="Fifth Place: The fifth-place participant will receive a $100 cash prize, celebrating their inventive achievements and passion for hands-on technology.",
                prize6="Sixth Place: The sixth-place participant will be awarded a $75 cash prize, acknowledging their technical skill and creativity in DIY electronics and robotics.",
                prize7="Seventh Place: The seventh-place participant will receive a $50 cash prize, honoring their efforts and technological ingenuity.",
                prize8="Eighth Place: The eighth-place participant will be granted a $25 electronics components voucher, allowing them to expand their toolkit and fuel their next creations.",
                registration_schedule="Makers and DIY enthusiasts can register for the competition through [provide registration details]. Spaces may be limited, so early registration is encouraged.", # need a way to grab date
                user_id = user_14.id,
            ),
            Competition(
                title="CodeCrafters Coding Challenge",
                objective="Enter the realm of digital mastery and showcase your coding wizardry in the CodeCrafters Coding Challenge! This exhilarating competition invites programmers of all levels to demonstrate their problem-solving skills, coding prowess, and passion for crafting elegant and efficient software solutions.",
                description="Welcome to the CodeCrafters Coding Challenge, where lines of code become brushstrokes, and algorithms paint masterpieces of functionality. This thrilling contest provides a stage for programmers to embark on coding adventures, crafting solutions that tackle real-world challenges and push the boundaries of software development. The CodeCrafters Coding Challenge will host a virtual showcase, allowing participants and spectators to explore the coding creations of all contenders. The digital exhibit will celebrate the brilliance of software development and innovation. Unleash your coding prowess and become a true CodeCraft Master in this exciting challenge, where logic prevails, innovation thrives, and software solutions come to life!",
                compImg = "https://miro.medium.com/v2/resize:fit:10116/1*VBAaUoOm0WRmAgxXVUwHIA.jpeg",
                scoring="A panel of tech experts, software engineers, and coding enthusiasts will contribute to the scoring process. They will evaluate code efficiency, algorithm design, creativity, and the overall impact of the projects. The participant with the highest overall score at the end of the CodeCrafters Coding Challenge will be crowned the CodeCraft Champion.",
                schedule="",
                contact="",
                location="Virtual (Participants will work from their own offices or creative spaces)",
                requirements="",
                competition_tasks="1. RoboMachina Showcase: In this task, participants will exhibit their self-designed robots or robotic projects, demonstrating their functionality, efficiency, and unique features. Robots can be autonomous, remote-controlled, or programmed using cutting-edge AI. 2. ElectroCraft Wonders: Makers will showcase their innovative electronics projects, which could include custom-built gadgets, IoT devices, electronic wearables, or home automation systems, highlighting how they enhance and simplify daily life. 3. TechBreakthrough Design: In this task, participants will present their groundbreaking designs or inventions that offer ingenious solutions to real-world challenges. Projects may range from renewable energy solutions to assistive technology for individuals with disabilities. 4. DIY Robotics Challenge: Participants will compete in an exciting robotics challenge, where they will construct robots capable of completing specific tasks within a set timeframe. The challenge will test participants' engineering skills, robotics know-how, and quick problem-solving abilities.",
                safety_measures="To participate in the CodeCrafters Coding Challenge, participants must have access to a stable internet connection and a device (computer, tablet, or smartphone) with a working camera and microphone.",
                prize1="Grand Prize: The CodeCraft Champion will receive a high-end laptop or tech gadget, empowering them to continue their coding journey with cutting-edge tools.",
                prize2="Second Place: The runner-up will be awarded a comprehensive coding course or online learning subscription, allowing them to expand their coding knowledge and skills.",
                prize3="Third Place: The esteemed third-place coder will be granted a stipend to attend a prominent tech conference or workshop, immersing themselves in the latest developments and trends in coding.",
                prize4="Fourth Place: The fourth-place participant will be granted a $150 cash prize, acknowledging their exceptional talent and dedication to coding craftsmanship.",
                prize5="Fifth Place: The fifth-place participant will receive a $100 cash prize, celebrating their coding achievements and passion for problem-solving.",
                prize6="Sixth Place: The sixth-place participant will be awarded a $75 cash prize, acknowledging their technical skill and creativity in software development.",
                prize7="Seventh Place: The seventh-place participant will receive a $50 cash prize, honoring their efforts and coding ingenuity.",
                prize8="Eighth Place: The eighth-place participant will be granted a $25 coding resource voucher, allowing them to enhance their toolkit and explore new coding horizons.",
                registration_schedule="Programmers can register for the competition through [provide registration details]. Spaces may be limited, so early registration is encouraged.", # need a way to grab date
                user_id = user_14.id,
            ),
        ]
        db.session.add_all(competitions)
        db.session.commit()


#---------------------------------------------------------------------------------Results-----------------------------------------------------------------------------------------------

        print("Seeding our Entries...")
        entries = [
            Entry(
            submission="https://images.jpost.com/image/upload/f_auto,fl_lossy/c_fill,g_faces:center,h_428,w_640/525666",
            description="A breathtaking view of the Milky Way as seen from a remote location in BIG BEND NATIONAL PARK, TEXAS. The dense cluster of stars in the center is prominently visible, with the dark interstellar dust creating an intriguing contrast.",
            user_id=user_6.id,
            competition_id=competitions[1].id,
            ),
            Entry(
            submission="https://www.constellation-guide.com/wp-content/uploads/2022/06/night-sky-tonight-northern-hemisphere-july.webp",
            description="A detailed guide to the constellations visible during the month of August. Each constellation is described with its historical background, mythological significance, and key stars. Also included are tips for identifying each constellation in the night sky.",
            user_id=user_10.id,
            competition_id=competitions[1].id,
            ),
            Entry(
            submission="https://www.jeffsullivanphotography.com/wp-content/uploads/2018/12/Death-Valley-Geminids-Jeff_Sullivan-2913-3320.jpg",
            description="A mesmerizing time-lapse video of the Perseid meteor shower, captured during its peak activity. Each meteor trail is distinctly visible, showcasing the shower's radiant beauty against the backdrop of a dark, starry sky.",
            user_id=user_19.id,
            competition_id=competitions[1].id,
            ),
            Entry(
            submission="https://i.ytimg.com/vi/y3qFm_-GVks/maxresdefault.jpg",
            description="An audio recording capturing the ambient sounds of the night during a stargazing session. The gentle chirping of crickets, the distant howl of a coyote, and the occasional rustling of leaves combine to create a serene atmosphere that complements the beauty of the night sky.",
            user_id=user_21.id,
            competition_id=competitions[1].id,
            ),
            Entry(
            submission="https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdvbWFuJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
            description="A poignant portrait of a young woman, Julia, with tears glistening in her eyes. The soft lighting emphasizes the raw emotion on her face, capturing a moment of vulnerability and introspection.",
            user_id=user_26.id,
            competition_id=competitions[4].id,
            ),
            Entry(
            submission="https://seal2013.files.wordpress.com/2014/04/street-x.jpg",
            description="A vibrant snapshot of a bustling market street in Marrakech. The image captures the essence of the local culture, with street vendors peddling their wares, colorful textiles hanging from stalls, and a cacophony of sounds echoing in the background. The photograph tells a story of life, commerce, and the spirit of the city.",
            user_id=user_11.id,
            competition_id=competitions[4].id,
            ),
            Entry(
            submission="https://i.ytimg.com/vi/TUM1Phi3zuI/maxresdefault.jpg",
            description="Our team began the trek just as dawn was breaking, with the soft glow of the morning sun painting the skies. As we made our way through the trail, the gentle sound of cascading water drew us closer to the first waterfall. The fresh misty air and the sheer beauty of nature left us in awe. Taking a moment to meditate by the falls, we felt an overwhelming sense of connection with the surroundings.",
            user_id=user_2.id,
            competition_id=competitions[0].id,
            ),
            Entry(
            submission="https://www.nps.gov/piro/planyourvisit/images/hikers-on-NCT-1.jpg",
            description="The trail provided both challenges and wonders. Each waterfall we encountered told a different story - from gentle cascades to majestic falls. Our team, though tested by the terrain, grew closer with every step. Sharing stories, helping each other through tricky paths, and taking in the beauty together made the journey unforgettable.",
            user_id=user_4.id,
            competition_id=competitions[0].id,
            ),
            Entry(
            submission="https://www.wedreamoftravel.com/wp-content/uploads/2020/08/Silver-Falls.jpg",
            description="While navigating towards the fourth waterfall, we stumbled upon an off-beaten path. Curiosity got the better of us, and we decided to explore. What we discovered was a secluded mini waterfall, not on the map, where we spent hours simply admiring nature's hidden gem. This unexpected detour became the highlight of our trek.",
            user_id=user_10.id,
            competition_id=competitions[0].id,
            ),
            Entry(
            submission="https://gowanderwild.com/wp-content/uploads/2023/09/South-Falls-Trail-of-Ten-Falls-Silver-Falls-State-Park-Oregon-35.jpg",
            description="The Trail of Ten Falls is not just about witnessing nature's wonders, but also about introspection. As we trekked, each member took turns sharing personal stories and reflections, inspired by the natural beauty around. By the end of the trail, we not only explored the external landscape but also the landscapes of our souls.",
            user_id=user_22.id,
            competition_id=competitions[0].id,
            ),
            Entry(
            submission="https://uprootedtraveler.com/wp-content/uploads/trail-of-ten-falls-trail-of-10-falls-lower-south-falls-2.jpg",
            description="Facing challenges like slippery paths and steep inclines, our team's spirit never wavered. Each waterfall became a milestone, a testament to our determination. By the time we reached the last waterfall, the sense of accomplishment was overwhelming. It wasn't just about completing the trek, but about the bonds formed and the memories made.",
            user_id=user_29.id,
            competition_id=competitions[0].id,
            ),
        ]
        db.session.add_all(entries)
        db.session.commit()


        print("TITLE:", competitions[1].title)
        print("TITLE:", competitions[2].title)
        print("TITLE:", competitions[3].title)
        print("TITLE:", competitions[4].title)
        print("TITLE:", competitions[5].title)
        print("TITLE:", competitions[6].title)



        #---------------------------------------------------------------------------------Results-----------------------------------------------------------------------------------------------
        print("Seeding our Results...")
        results = [
            Result(
            placement=2,
            user_id=user_6.id,
            competition_id=competitions[1].id,
            entry_id = entries[1].id,
            ),
            Result(
            placement=4,
            user_id=user_10.id,
            competition_id=competitions[1].id,
            entry_id = entries[2].id,
            ),
            Result(
            placement=1,
            user_id=user_19.id,
            competition_id=competitions[1].id,
            entry_id = entries[3].id,
            ),
            Result(
            placement=3,
            user_id=user_21.id,
            competition_id=competitions[1].id,
            entry_id = entries[4].id,
            ),
            Result(
            placement=5,
            user_id=user_26.id,
            competition_id=competitions[4].id,
            entry_id = entries[5].id,
            ),
            Result(
            placement=1,
            user_id=user_11.id,
            competition_id=competitions[4].id,
            entry_id = entries[6].id,
            ),
            Result(
            placement=3,
            user_id=user_2.id,
            competition_id=competitions[0].id,
            entry_id = entries[7].id,
            ),
            Result(
            placement=5,
            user_id=user_4.id,
            competition_id=competitions[0].id,
            entry_id = entries[8].id,
            ),
            Result(
            placement=1,
            user_id=user_22.id,
            competition_id=competitions[0].id,
            entry_id = entries[9].id,
            ),
            Result(
            placement=2,
            user_id=user_29.id,
            competition_id=competitions[0].id,
            entry_id = entries[10].id,
            ),
        ]
        db.session.add_all(results)
        db.session.commit()



        print("Existing data is now established.")
        db.session.commit()

 