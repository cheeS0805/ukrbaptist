import { useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SocialShareIcons } from '../../../components/SocialShareIcons/SocialShareIcons';
import './HistoryPage.scss';

interface OutletContext { currentLang: 'en' | 'uk' }

export function HistoryPage() {
  const { currentLang } = useOutletContext<OutletContext>();
  const { t } = useTranslation('about');

  return (
    <div className="history-page">
      <div className="history-page__social">
        <SocialShareIcons />
      </div>

      <div className="history-page__container">
        <h1 className="history-page__title">{t('history.heading')}</h1>
        <p className="history-page__subtitle">
          {currentLang === 'uk'
            ? <>{t('history.subheading')}</>
            : <>A brief history of<br />the Ukrainian Evangelical Baptist Convention<br />in the United States of America</>
          }
        </p>

        <div className="history-page__content">
          <p>
            The year 2020 marks the 75th anniversary of the founding of the Ukrainian Evangelical Baptist Convention in the USA (UEBC), which originally was organized as the Ukrainian Missionary and Bible Society (UMBS).
          </p>
          <p>
            A small group of Ukrainian Baptists met in Chester, Pennsylvania in the summer of 1945 to discuss opportunities to help, support and evangelize Ukrainians who were exiled from Ukraine during World War II and those who suffered persecution in the USSR.
          </p>
          <p>
            Those founders were Paul Bartkow (Павло Бартков), John Piatkowski (Іван П’ятковський), Wasyl Mohyliak (Василь Могиляк), Kost Lemcio (Кость Лемцьо), Mykola Pobihushka (Микола Побігунка), and Wasyl Bartish (Василь Бартиш).
          </p>
          <p>
            This initial meeting led to the first assembly of the Ukrainian Missionary and Bible Society (Українське Місійно-Біблійне Товариство) in Detroit, Michigan, on April 13–14, 1946.
          </p>

           <div className="history-page__image-block">
            <img 
              src="/images/history/detroit-church.jpeg" 
              alt="The Ukrainian Baptist Church in Detroit" 
              className="history-page__image-full"
            />
            <div className="history-page__image-caption">The Ukrainian Baptist Church in Detroit.</div>
          </div>

          <p>
            Elected as the first president was Rev. Paul Bartkow (Павло Бартков), a pastor from Chester, PA. Elected as the first director was Rev. James Hominuke (Яків Гомінюк). Rev. Hominuke eventually became director of the Ukrainian Bible Institute in Saskatoon, Canada.
          </p>

          <div className="history-page__image-inline">
            <img 
              src="/images/history/paul-bartkow.jpeg" 
              alt="Rev. Paul Bartkow" 
              className="history-page__image-portrait"
            />
            <div className="history-page__image-caption">Rev. Paul Bartkow</div>
          </div>


          <p>
            On June 18, 1946, the UMBS was incorporated under the laws of the State of Illinois. During the 1953 annual meeting in Chester, Pennsylvania, the name was changed to the Ukrainian Evangelical Baptist Convention – signifying an association of churches – with the name Ukrainian Missionary and Bible Society retained to denote its missionary arm. In the Ukrainian language, the Convention was called Об’єднання Українських Євангельсько-Балтистських Церков.
          </p>
          <p>
            Some of the churches had been established many years before the association was formed. For example, the Chester church started in 1915, as was the Chicago church. The Detroit church began in 1923.
          </p>

          <h2 className="history-page__section-title">Accomplishments</h2>
          <p>
            Some notable accomplishments of the Ukrainian Missionary and Bible Society and the Ukrainian Evangelical Baptist Convention include: establishing Bible institutes in Canada and Argentina, publishing the Ukrainian magazine “The Messenger of Truth” (which was edited for many years by Rev. Dr. Lev Zabko-Potapovich), broadcasting “Voice of the Gospel into Ukraine” by short wave, supporting the planting of at least 30 new Ukrainian churches in the U.S., and advocating for persecuted Christians in the USSR before the United Nations and the U.S. government.
          </p>
          <p>
            Rev. Paul Bartkow served as president of the association for 20 years, from its founding until 1967, except for one year, September 1960 to September 1961, when Rev. John Barchuk (Іван Барчук) of Chicago served as president and Rev. Bartkow served as vice-president. Rev. Bartkow was succeeded as president by Rev. Olexa Harbuziuk (Олекса Гарбузюк) from Chicago, who was elected on September 2, 1967 during the annual conference in Chicago. Rev. Harbuziuk served as president until September 4, 1971, when he was elected to the newly created position of general secretary at the 26th annual conference. He served as general secretary until 1996. The position of president continued to function alongside the post of general secretary.
          </p>
          <p>
            Currently, the UEBC bylaws stipulate that a person can serve only two four-year terms as president. The position of general secretary has been eliminated.
          </p>

          <h2 className="history-page__section-title">Sites of past conferences</h2>
          <p>
            Although the Ukrainian Baptist Church of Detroit was the site of the first two annual conferences, it never hosted another annual conference. (However, some youth conferences were held in Detroit.)
          </p>
          <p>
            The churches that have hosted the most conferences are the Ukrainian Baptist Church of Chicago, 17; First Ukrainian Evangelical Baptist Church of Philadelphia, 15; Ukrainian Baptist Church of Chester, 8 (which later merged with the Crum Lynne church); Ukrainian Evangelical Baptist Church in Crum Lynne, PA, 6; First Ukrainian Evangelical Baptist Church of Minneapolis, 4; Ukrainian Baptist Church of Cleveland, 4. Two conferences were held at the Evangelical Baptist Camp in Ashford, Connecticut in 1978 and 1979. In the past 30 years, annual conferences also have been hosted by churches in such cities as Trenton, New Jersey; Levittown, Pennsylvania; Charlotte, North Carolina; Sacramento, California; Vineland, New Jersey; Lancaster, Pennsylvania; Warminster, Pennsylvania; North Port, Florida; and Richland, New Jersey.
          </p>
          <p>
            The reason that some churches hosted many conferences during the early decades was twofold: many churches in the association (об’єднання) were too small to be hosts, and there was an attempt to alternate the locations between the East Coast and the Midwest.
          </p>
          <p>
            It should be noted that the great distance from the West Coast made it difficult for many people to travel to annual conferences in the Midwest and the East Coast; so the churches on the West Coast formed the Western Ukrainian Evangelical Baptist Convention in 1963 and held their own annual conferences.
          </p>

          <h2 className="history-page__section-title">Immigration from South America</h2>
          <p>
            The 1960s and 1970s brought a wave of Ukrainian Baptists from South America to the United States. Most of them came from Argentina, Paraguay and Brazil, where the UEBC supported missionaries. Some people emigrated from Venezuela and Uruguay. Some of the immigrants became pastors, choir directors, choir members, Sunday School teachers and leaders in their churches in the United States and in the association. For example, two graduates of the Ukrainian Bible Institute in Obera, Misiones, Argentina, became president of the UEBC in the U.S. – Rev. Dr. John Kovalchuk (Іван Ковальчук) from 1999 to 2005 and Rev. Dr. Avdiy Chripczuk (Овдій Хрипчук) from 2005 to 2011.
          </p>

          <h2 className="history-page__section-title">Some churches disbanded; new churches arose</h2>
          <p>
            Many Ukrainian Baptist Churches in the United States disbanded over the years, mostly because older members died or moved away when they retired or for other reasons, or because some young people joined American churches, or because some young people never became members. Some examples are Irvington, NJ (Newark area); Hartford, CT; Detroit, MI; Milwaukee, WI; Ventura, CA; Fresno, CA; Brooklyn, NY; Rochester, NY; St. Petersburg, FL; Manchester, NH; Gardiner, Maine; Atlantic City, NJ; Woonsocket, Rhode Island; Frackville, PA; Clearwater, FL; Kansas City, KS; Chester, PA (merged with Crum Lynne church); Philadelphia 2nd church (merged with 1st); Minneapolis 2nd church (merged with 1st); Hemet, CA (1st); and Los Angeles, CA.
          </p>
          <p>
            However, with the influx of refugees and immigrants from Ukraine and other countries in the former Soviet Union in the 1990s, new churches were planted and joined the association. In 2011, the UEBC elected its first president from among the new wave of immigrants – Rev. Anatoly Moshkovsky, who had been pastor of the Ukrainian Evangelical Baptist Church in Crum Lynne, PA. He served as president until 2018 (the final year as interim president).
          </p>

          <h2 className="history-page__section-title">Ministries</h2>
          <p>
            Since the new wave of immigration in the 1990s, the Convention and its churches have continued to serve the Ukrainian people in the United States, Ukraine, and other locations. Activities have included supporting missionaries in Ukraine and elsewhere; organizing camps for children and youth; sponsoring college scholarships; ordaining deacons and pastors; organizing women’s conferences; and sponsoring seminars and forums.
          </p>
          <p>
            For example, it was reported at the 48th annual conference in 1993 in Trenton, New Jersey, that more than 100,000 books were printed that year for distribution in Ukraine through the efforts of Doroha Pravdy (Дорога Правды publishers). In addition, it was reported that more than 20 churches in Ukraine received financial assistance from the association in 1992 to construct church buildings. In other years, tens of thousands of Bibles and New Testaments were sent to Ukraine.
          </p>

          <h2 className="history-page__section-title">Publishing</h2>
          <p>
            In 1953, Ukrainian Baptists in the U.S. and Canada established a publishing house — “Doroha Pravdy” (Дорога Правды), The Way of Truth). Doroha Pravdy published about 100 titles, including choir songbooks, poetry, novels and theology. Many of the books were written by Rev. John Barchuk (Іван Барчук) and Mr. Michael Podworniak (Михайло Подворняк), editor of the Christian Herald magazine (Християнський Вісник) in Canada.
          </p>
          <p>
            Nowadays, the UEBC is participating in two printing projects with the seminary in Lviv, Ukraine. The Greek-Ukrainian Interlinear Translation of the Bible so far has produced the epistles of Paul to Timothy, Titus, Philemon, Romans, Galatians and Ephesians, the Gospel according to Luke. (Please visit the web site www.UkrInterlinear.com for more information.) “The Ukrainian Study Bible” will be the first Ukrainian Bible with commentaries, introductions to all the books, maps, articles on biblical topics, etc.
          </p>

          <h2 className="history-page__section-title">Radio broadcasting</h2>
          <p>
            Some churches sponsor local radio programs, such as Philadelphia and Chicago. However, the “Ukrainian Voice of the Gospel into Ukraine” – which started as a weekly radio broadcast in 1966 and eventually was broadcast every day of the week — ceased broadcasting in 1993 after Ukraine became free and independent from the USSR. One of those radio broadcasts was a weekly program prepared especially for children.
          </p>
          <p>
            Praise the Lord for His many blessings as the Ukrainian Evangelical Baptist Convention in the USA has remained faithful for 75 years while proclaiming the Gospel and working to advance His kingdom. Unfortunately, the 75th annual jubilee conference had to be canceled because of the coronavirus pandemic.
          </p>

          <h2 className="history-page__section-title">Further information</h2>
          <p>
            For more information about the history of the UMBS and the UEBC, please look at various pages on the web site www.RevHarbuziukLegacy.com, especially the “Ministries” heading, and then click on “Church Association,” where there are five subpages, and also “Chicago church,” where there are six subpages. For a list of pastors who were involved mostly from 1950 to 2000, please click on “History,” then “Famous People,” then “Pastors.”
          </p>
          <p>
            To read about current activities sponsored by the Convention or its member churches, please look at various pages on this website (UkrBaptist.org), especially the “Events” page under “Calendar.”
          </p>
        </div>
      </div>
    </div>
  );
}