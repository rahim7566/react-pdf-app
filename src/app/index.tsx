import { Asset } from "expo-asset";
import { File, Paths } from "expo-file-system";
import { useFonts } from "expo-font";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  FlatList,
  I18nManager,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Pdf, { PdfRef } from "react-native-pdf";
import { IndexItem, PDF_INDEX } from "../constants/pdfIndex";
import { styles } from "../styles/appStyles";

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const convertUrduToEnglishNumbers = (input: string): string => {
  const urduNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  let output = input;
  for (let i = 0; i < 10; i++) {
    output = output.replace(urduNumbers[i], i.toString());
  }
  return output;
};

const toUrduNumber = (num: number | string): string => {
  const urduDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().split('').map((d) => urduDigits[parseInt(d, 10)]).join('');
};

const { width, height } = Dimensions.get("window");

export default function Index() {
  const pdfRef = useRef<PdfRef>(null);
  const [localPdfUri, setLocalPdfUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPdf, setShowPdf] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<IndexItem | null>(null);
  const [targetPage, setTargetPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchPageText, setSearchPageText] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAboutUs, setShowAboutUs] = useState(false);

  const [fontsLoaded] = useFonts({
    "MehrNastaleeq": require("../../assets/fonts/MehrNastaleeq.ttf"),
    "Amiri-Regular": require("../../assets/fonts/Amiri-Regular.ttf"),
  });

  useEffect(() => {
    async function preparePdf() {
      try {
        const dir = Paths.document || Paths.cache;
        const file = new File(dir, "SAHIH_LUGHAT_UL_QURAAN.pdf");
        if (file.exists) {
          setLocalPdfUri(file.uri);
        } else {
          const asset = Asset.fromModule(require("../../assets/SAHIH_LUGHAT_UL_QURAAN.pdf"));
          await asset.downloadAsync();
          if (asset.localUri) {
            const source = new File(asset.localUri);
            source.copy(file);
            setLocalPdfUri(file.uri);
          }
        }
      } catch (e) {
        console.log("PDF load error:", e);
      } finally {
        setIsLoading(false);
      }
    }
    preparePdf();
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (alertVisible) {
        setAlertVisible(false);
        return true;
      }
      if (showPdf) {
        setShowPdf(false);
        return true;
      }
      if (showAboutUs) {
        setShowAboutUs(false);
        return true;
      }
      if (selectedLetter) {
        setSelectedLetter(null);
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [showPdf, selectedLetter, alertVisible, showAboutUs]);

  // Handle Main Item click intelligently
  const handleMainItemPress = (item: IndexItem) => {
    if (item.subLetters && item.subLetters.length > 0) {
      setSelectedLetter(item); // Show sub-index only if data exists
    } else {
      const destination = item.targetPage ?? item.page;
      setTargetPage(destination);
      setShowPdf(true); // Jump directly to PDF if no sub-list is defined
    }
  };

  const handleSubItemPress = (subItem: any) => {
    const destination = subItem.targetPage ?? subItem.page;
    setTargetPage(destination);
    setShowPdf(true);
  };

  const showAlert = (title: string, message: string) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const handlePageSearchSubmit = () => {
    if (!searchPageText.trim()) return;

    const standardDigits = convertUrduToEnglishNumbers(searchPageText);
    const parsedPage = parseInt(standardDigits, 10);

    if (isNaN(parsedPage) || parsedPage <= 0) {
      showAlert("غلط نمبر", "برائے مہربانی درست صفحہ نمبر درج کریں۔");
      setSearchPageText("");
      return;
    }

    if (totalPages > 0 && parsedPage > totalPages) {
      showAlert(
        "صفحہ دستیاب نہیں",
        `اس کتاب میں کل ${toUrduNumber(totalPages)} صفحات ہیں۔`
      );
      setSearchPageText("");
      return;
    }
    if (parsedPage > 469) {
      setTargetPage(parsedPage);
    } else {
      setTargetPage(parsedPage + 1);
    }
    setShowPdf(true);
    setSearchPageText("");
  };

  if (!fontsLoaded || isLoading || !localPdfUri) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0F4C43" />
        <Text style={styles.loadingText}>لوڈ ہو رہا ہے...</Text>
      </View>
    );
  }

  // VIEW 4: About Us (ہمارے بارے میں) Full Screen View
  if (showAboutUs) {
    return (
      <View style={styles.indexScreen}>
        {/* Header Block */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>ہمارے بارے میں</Text>
          <Text style={styles.subtitle}>ایپلی کیشن کی تفصیلات</Text>
          <View style={styles.decoratorLine} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.aboutScrollContainer}
        >
          <View style={styles.aboutContentCard}>
            <Text style={styles.aboutHeadingText}>صَحیح لُغاتُ القُرْآن</Text>

            <Text style={styles.aboutBodyText}>
              یہ صَحیح لُغاتُ القُرْآن کی آفیشل اینڈرائیڈ ایپلی کیشن ہے، جس کا مقصد قرآنی الفاظ کے درست مفاہیم اور لغات تک آسان رسائی فراہم کرنا ہے۔
              قرآن مجید میں جتنے بھی الفاظ ہیں وہ تقریباً سبھی اس لغت میں موجود ہیں جو کہ باآسانی معنی کو ڈھونڈنے اور سمجھنے میں مدد فراہم کرتے ہیں۔
            </Text>

            <Text style={styles.aboutBodyText}>
              اس ایپ کی مدد سے آپ حروفِ تہجی اور ان کے ذیلی حروف کے ذریعے سیکنڈوں میں مطلوبہ صفحات تک پہنچ سکتے ہیں۔ اور براہِ راست صفحہ نمبر تلاش کرنے کی سہولت بھی موجود ہے۔
            </Text>

            <Text style={styles.aboutBodyText}>
              اس کے علاوہ صفحہ نمبر ۴۷۱ پر ”قرآن مجید میں وجوہ اور نظائر کا بیان“ اور صفحہ نمبر ۴۷۹ پر ”فصل“ (یعنی اہم الفاظ کی منطق) کا مطالعہ ہے۔
            </Text>

            <View style={styles.developerNameContainer}>
              <Text style={styles.developerLabelText}>بندہ عاجز:</Text>
              <Text style={styles.developerNameText}>محمد عبد الرحیم</Text>
              <Text style={styles.developerSubText}>سافٹ ویئر انجینئر </Text>
              <Text style={styles.developerEmailText}>abdurrahim7566@gmail.com</Text>
            </View>

            <Text style={styles.aboutFooterVersion}>ورژن: ۱.۰</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  // VIEW 3: PDF Canvas Screen
  if (showPdf) {
    return (
      <View style={styles.container}>
        <Pdf
          ref={pdfRef}
          source={{ uri: localPdfUri, cache: true }}
          horizontal={true}
          enablePaging={true}
          enableRTL={true}
          onLoadComplete={(numberOfPages) => {
            setTotalPages(numberOfPages);
            const rtlTargetPage = numberOfPages - targetPage + 1;
            setTimeout(() => {
              pdfRef.current?.setPage(rtlTargetPage);
            }, 0);
          }}
          style={styles.pdfCanvasElement}
        />
      </View>
    );
  }

  // VIEW 2: Clean, Selective Sub-Index Screen
  if (selectedLetter) {
    return (
      <View style={styles.indexScreen}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{selectedLetter.title}</Text>
          <Text style={styles.subtitle}>ذیلی فہرِست</Text>
          <View style={styles.decoratorLine} />
        </View>

        <FlatList
          key="sub-rows"
          data={selectedLetter.subLetters}
          keyExtractor={(item, index) => `${item.letter}-${index}`}
          numColumns={1}
          contentContainerStyle={styles.subListContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const combinationTitle = `${selectedLetter.letterKey}-${item.letter}`;
            return (
              <TouchableOpacity
                style={styles.subIndexRow}
                onPress={() => handleSubItemPress(item)}
                activeOpacity={0.7}
              >
                <Text style={styles.subIndexTitle}>{combinationTitle}</Text>
                <View style={styles.subPageContainer}>
                  <Text style={styles.subPageLabel}>صفحہ</Text>
                  <Text style={styles.subPageNumber}>{toUrduNumber(item.page)}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }

  // VIEW 1: Main Alphabet Grid Menu
  return (
    <View style={styles.indexScreen}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={alertVisible}
        onRequestClose={() => setAlertVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{alertTitle}</Text>
            <Text style={styles.modalMessage}>{alertMessage}</Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setAlertVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.modalButtonText}>ٹھیک ہے</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.headerContainer}>

        <View style={styles.headerTitleRow}>

          {/* 1. Right Side Invisible Spacer: Balances out the width calculation */}
          <View style={styles.headerSideSpacer} />

          {/* 2. Middle Component: Stays completely clean, centered, and untouched */}
          <Text style={styles.header}>صَحِیح لُغَاتُ القُرْآن</Text>

          {/* 3. Left Side Component: Premium Floating Circular Info Action Icon */}
          <TouchableOpacity
            style={styles.aboutHeaderCircle}
            onPress={() => setShowAboutUs(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.aboutHeaderCircleText}>ⓘ</Text>
          </TouchableOpacity>

        </View>

        {/* Search Input bar container */}
        <View style={styles.topSearchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="صفحہ تلاش کریں..."
            placeholderTextColor="#9EA7A6"
            keyboardType="numeric"
            returnKeyType="search"
            value={searchPageText}
            onChangeText={setSearchPageText}
            onSubmitEditing={handlePageSearchSubmit}
            blurOnSubmit={true}
          />
        </View>

        <Text style={styles.subtitle}>فہرِستِ الفاظ</Text>
        <View style={styles.decoratorLine} />
      </View>

      {/* Modern 2-Column Grid List */}
      <FlatList
        key="main-grid"
        data={PDF_INDEX}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleMainItemPress(item)}
            activeOpacity={0.8}
          >
            <View style={styles.letterBadge}>
              <Text style={styles.cardTitle}>{item.title}</Text>
            </View>
            <View style={styles.pageContainer}>
              <Text style={styles.pageLabel}>صفحہ</Text>
              <Text style={styles.cardPage}>{toUrduNumber(item.page)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

