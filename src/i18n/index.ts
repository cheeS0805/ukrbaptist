import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'uk'],
    defaultNS: 'common',
    ns: ['common', 'home', 'churches', 'events', 'about', 'contacts', 'donate'],
    resources: {
      en: {
        common: {
          nav: {
            home: "Home",
            aboutUs: "About Us",
            history: "History",
            board: "Board",
            creed: "Creed",
            partners: "Partners",
            churches: "Churches",
            garage: "Garage",
            events: "Events",
            contacts: "Contacts",
            donate: "Donate",
          },
          footer: {
            copyright: "© 1946 — 2026 Ukrainian Baptist Convention in USA. All rights reserved.",
            credit: "Built and managed by Lagom Pack",
          },
          actions: {
            readMore: "Read more",
            readOriginal: "Read original source",
            donate: "Donate",
            send: "Send",
            loading: "Loading...",
            loadMore: "Load more",
          },
          articles: {
            imageGallery: "Image Gallery",
            moreEvents: "More Events",
            prev: "PREV",
            next: "NEXT",
          },
          langSwitcher: {
            uk: "Укр",
            en: "Eng",
          },
        },
        home: {
          heading: "Welcome to the official website of the Ukrainian Baptist Convention in the USA",
          newsSection: "Latest News",
          upcomingEvents: "Upcoming Events",
          noEvents: "No events found.",
          backToEvents: "Go Back to Event Listing",
        },
        churches: {
          heading: "The Churches within our Convention",
          subheading: "Member churches of the Ukrainian Evangelical Baptist Convention",
        },
        events: {
          heading: "Events",
          noEvents: "No events found.",
        },
        about: {
          history: {
            heading: "History",
            subheading: "A brief history of the Ukrainian Evangelical Baptist Convention in the United States of America",
          },
          committee: {
            heading: "Board of Directors",
          },
          creed: {
            heading: "Statement of Faith",
          },
          partners: {
            heading: "Our Partners",
          },
        },
        contacts: {
          heading: "Send Us a Message",
          address: "920 Trenton Rd, Fairless Hills, PA 19030",
          form: {
            name: "Name",
            email: "Email",
            message: "Message",
            submit: "Send",
            success: "Your message has been sent. Thank you!",
            error: "Something went wrong. Please try again.",
          },
        },
        donate: {
          heading: "Support Our Ministry",
          description: "Your generous donation helps us continue our mission of serving Ukrainian Baptist churches and communities across the USA.",
          button: "Make a Donation",
        },
      },
      uk: {
        common: {
          nav: {
            home: "Головна",
            aboutUs: "Про нас",
            history: "Історія",
            board: "Управа",
            creed: "Віровчення",
            partners: "Партнери",
            churches: "Церкви",
            garage: "Гараж",
            events: "Події",
            contacts: "Контакти",
            donate: "Пожертвувати",
          },
          footer: {
            copyright: "© 1946 — 2026 Об'єднання Українських Баптистських Церков у США. Всі права захищено.",
            credit: "За пiдтримкoю Lagom Pack",
          },
          actions: {
            readMore: "Детальніше",
            readOriginal: "Читати першоджерело",
            donate: "Пожертвувати",
            send: "Надіслати",
            loading: "Завантаження...",
            loadMore: "Завантажити більше",
          },
          articles: {
            imageGallery: "Фото галерея",
            moreEvents: "Більше подій",
            prev: "ПОПЕРЕДНЯ",
            next: "НАСТУПНА",
          },
          langSwitcher: {
            uk: "Укр",
            en: "Eng",
          },
        },
        home: {
          heading: "Ласкаво просимо на сайт Об'єднання Українських Баптистських Церков у США",
          newsSection: "Останні Новини",
          upcomingEvents: "Майбутні події",
          noEvents: "Подій не знайдено.",
          backToEvents: "Перейти до переліку подій",
        },
        churches: {
          heading: "Церкви Об'єднання",
          subheading: "Церкви-члени Об'єднання Українських Євангельсько-Баптистських Церков",
        },
        events: {
          heading: "Події",
          noEvents: "Подій не знайдено.",
        },
        about: {
          history: {
            heading: "Історія",
            subheading: "Коротка історія Об'єднання Українських Євангельсько-Баптистських Церков у США",
          },
          committee: {
            heading: "Управа Об'єднання",
          },
          creed: {
            heading: "Визнання віри Євангельських Християн-Баптистів",
          },
          partners: {
            heading: "Наші Партнери",
          },
        },
        contacts: {
          heading: "Надішліть нам повідомлення",
          address: "920 Trenton Rd, Fairless Hills, PA 19030",
          form: {
            name: "Ім'я",
            email: "Email",
            message: "Повідомлення",
            submit: "Надіслати",
            success: "Ваше повідомлення надіслано. Дякуємо!",
            error: "Щось пішло не так. Спробуйте ще раз.",
          },
        },
        donate: {
          heading: "Підтримайте наше служіння",
          description: "Ваша щедра пожертва допомагає нам продовжувати місію служіння українським баптистським церквам і громадам по всій Америці.",
          button: "Зробити пожертву",
        },
      },
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
