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
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Pdf, { PdfRef } from "react-native-pdf";

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

// 1. Define a clean structure for the sub-index items
interface SubLetterItem {
  letter: string; // e.g. "ا", "ب", "ت"
  page: number;   // The specific page for this exact combination
}

interface IndexItem {
  id: number;
  title: string;
  letterKey: string; 
  page: number;
  targetPage?: number;
  subLetters?: SubLetterItem[]; // OPTIONAL: Only add this if the letter has specific sub-chapters
}

// 2. Map only the existing combinations found in your book
const PDF_INDEX: IndexItem[] = [
  { 
    id: 1, 
    title: "اٰ", 
    letterKey: "اٰ", 
    page: 3, 
    targetPage: 4,
    subLetters: [
      { letter: "ب", page: 4 },
      { letter: "ت", page: 5 },
      { letter: "ث", page: 5 }, 
      { letter: "خ", page: 12 },
      { letter: "د", page: 5 },
      { letter: "ذ", page: 5 },
      { letter: "ز", page: 5 },
      { letter: "ت", page: 5 },
      { letter: "س", page: 5 },
      { letter: "ص", page: 5 },
      { letter: "ف", page: 5 },
      { letter: "ک", page: 5 },
      { letter: "ل", page: 5 },
      { letter: "م", page: 5 },
      { letter: "ن", page: 5 },
      { letter: "و", page: 5 },
      { letter: "ی", page: 91 },
      
    ]
  },
  { 
    id: 2, 
    title: "ا (الف)", 
    letterKey: "ا", 
    page: 3, 
    targetPage: 4,
    subLetters: [
      { letter: "ء", page: 5 },
      { letter: "ب", page: 4 },
      { letter: "ت", page: 5 },
      { letter: "ث", page: 5 }, 
      { letter: "ج", page: 5 },
      { letter: "ح", page: 5 },
      { letter: "خ", page: 12 },
      { letter: "د", page: 5 },
      { letter: "ذ", page: 5 },
      { letter: "ر", page: 5 },
      { letter: "ز", page: 5 },
      { letter: "س", page: 5 },
      { letter: "ش", page: 5 },
      { letter: "ص", page: 5 },
      { letter: "ض", page: 5 },
      { letter: "ط", page: 5 },
      { letter: "ظ", page: 5 },
      { letter: "ع", page: 5 },
      { letter: "غ", page: 5 },
      { letter: "ف", page: 5 },
      { letter: "ق", page: 5 },
      { letter: "ک", page: 5 },
      { letter: "ل", page: 5 },
      { letter: "م", page: 5 },
      { letter: "ن", page: 5 },
      { letter: "و", page: 5 },
      { letter: "ھ", page: 91 },
      { letter: "ی", page: 5 },

    ]
  },
  { 
    id: 3, 
    title: "ب", 
    letterKey: "ب", 
    page: 61, 
    targetPage: 62,
    subLetters: [
      { letter: "ء", page: 5 },
      { letter: "ا", page: 5 },
      { letter: "ث", page: 5 }, 
      { letter: "ح", page: 5 },
      { letter: "خ", page: 12 },
      { letter: "د", page: 5 },
      { letter: "ر", page: 5 },
      { letter: "س", page: 5 },
      { letter: "ش", page: 5 },
      { letter: "ص", page: 5 },
      { letter: "ض", page: 5 },
      { letter: "ط", page: 5 },
      { letter: "ع", page: 5 },
      { letter: "غ", page: 5 },
      { letter: "ق", page: 5 },
      { letter: "ک", page: 5 },
      { letter: "ل", page: 5 },
      { letter: "م", page: 5 },
      { letter: "ن", page: 5 },
      { letter: "و", page: 5 },
      { letter: "ھ", page: 91 },
      { letter: "ی", page: 5 },
    ]
  },
  { 
    id: 4, 
    title: "ت", 
    letterKey: "ت", 
    page: 61, 
    targetPage: 62,
    subLetters: [
      { letter: "ا", page: 5 },
      { letter: "ب", page: 4 },
      { letter: "ت", page: 5 },
      { letter: "ث", page: 5 }, 
      { letter: "ج", page: 5 },
      { letter: "ح", page: 5 },
      { letter: "خ", page: 12 },
      { letter: "د", page: 5 },
      { letter: "ذ", page: 5 },
      { letter: "ر", page: 5 },
      { letter: "ز", page: 5 },
      { letter: "س", page: 5 },
      { letter: "ش", page: 5 },
      { letter: "ص", page: 5 },
      { letter: "ض", page: 5 },
      { letter: "ط", page: 5 },
      { letter: "ظ", page: 5 },
      { letter: "ع", page: 5 },
      { letter: "غ", page: 5 },
      { letter: "ف", page: 5 },
      { letter: "ق", page: 5 },
      { letter: "ک", page: 5 },
      { letter: "ل", page: 5 },
      { letter: "م", page: 5 },
      { letter: "ن", page: 5 },
      { letter: "و", page: 5 },
      { letter: "ھ", page: 91 },
      { letter: "ی", page: 5 },
    ]
  },
    { 
    id: 5, 
    title: "ث", 
    letterKey: "ث", 
    page: 61, 
    targetPage: 62,
    subLetters: [
      { letter: "ا", page: 5 },
      { letter: "ب", page: 4 },
      { letter: "ج", page: 5 },
      { letter: "ر", page: 5 },
      { letter: "ع", page: 5 },
      { letter: "غ", page: 5 }, 
      { letter: "ق", page: 5 },
      { letter: "ل", page: 5 },
      { letter: "م", page: 5 },
      { letter: "و", page: 5 },
      { letter: "ی", page: 5 },
    ]
  },
  { 
    id: 6, 
    title: "ج", 
    letterKey: "ج", 
    page: 61, 
    targetPage: 62,
    subLetters: [
      { letter: "آ", page: 5 },
      { letter: "ء", page: 5 },
      { letter: "ا", page: 5 },
      { letter: "ب", page: 4 },
      { letter: "ث", page: 5 }, 
      { letter: "ح", page: 5 },
      { letter: "د", page: 5 },
      { letter: "ذ", page: 5 },
      { letter: "ر", page: 5 },
      { letter: "ز", page: 5 },
      { letter: "س", page: 5 },
      { letter: "ع", page: 5 },
      { letter: "ف", page: 5 },
      { letter: "ل", page: 5 },
      { letter: "م", page: 5 },
      { letter: "ن", page: 5 },
      { letter: "و", page: 5 },
      { letter: "ھ", page: 91 },
      { letter: "ی", page: 5 },
    ]
  },
];

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
      if (showPdf) {
        setShowPdf(false);
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
  }, [showPdf, selectedLetter]);

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

  const handleSubItemPress = (pageNumber: number) => {
    setTargetPage(pageNumber); // Open the exact custom page for that combination
    setShowPdf(true);
  };

  if (!fontsLoaded || isLoading || !localPdfUri) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0F4C43" />
        <Text style={styles.loadingText}>لوڈ ہو رہا ہے...</Text>
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
          data={selectedLetter.subLetters} // Loops only through existing combinations
          keyExtractor={(item) => item.letter}
          numColumns={1} 
          contentContainerStyle={styles.subListContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const combinationTitle = `${selectedLetter.letterKey}-${item.letter}`;
            return (
              <TouchableOpacity
                style={styles.subIndexRow}
                onPress={() => handleSubItemPress(item.page)}
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
      <View style={styles.headerContainer}>
        <Text style={styles.header}>صَحِیح لُغَاتُ القُرْآن</Text>
        <Text style={styles.subtitle}>فہرِستِ الفاظ</Text>
        <View style={styles.decoratorLine} />
      </View>

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

      <View style={styles.bottomActionsBar}>
        <TouchableOpacity
          style={styles.primaryActionBtn}
          onPress={() => {
            setTargetPage(1);
            setShowPdf(true);
          }}
          activeOpacity={0.9}
        >
          <Text style={styles.primaryActionText}>ابتدائی صفحہ سے پڑھیں</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Global & Loading States
  container: { flex: 1, backgroundColor: "#0F4C43" },
  center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F7FAF9" },
  loadingText: { marginTop: 15, fontSize: 20, fontFamily: "MehrNastaleeq", color: "#0F4C43" },

  // Home Screen Layout
  indexScreen: { flex: 1, backgroundColor: "#F7FAF9" },
  headerContainer: {
    paddingTop: 30,
    paddingBottom: 12,
    backgroundColor: "#0F4C43",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: "center",
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  subtitle: {
    fontSize: 25,
    textAlign: "center",
    color: "#FFFFFF",
    fontFamily: "MehrNastaleeq",
  },
  header: {
    fontSize: 30,
    fontFamily: "Amiri-Regular",
    color: "#D4AF37",
    letterSpacing: 1,
    fontWeight: "600",
    marginBottom: 4,
  },
  decoratorLine: {
    width: 60,
    height: 3,
    backgroundColor: "#D4AF37",
    marginTop: 8,
    borderRadius: 2,
  },

  // Two-Column Grid Setup
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 120, // Prevents elements from hiding behind the bottom button bar
  },
  gridRow: {
    flexDirection: I18nManager.isRTL ? "row" : "row-reverse",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#FFFFFF",
    width: (width - 46) / 2, // Perfect calculation for symmetry with standard dynamic spacing
    borderRadius: 16,
    padding: 6,
    flexDirection: "row", // Preserves intuitive right-to-left optical balancing
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#EAF4F2",
    elevation: 2,
    shadowColor: "#1A3B35",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  letterBadge: {
    backgroundColor: "#EAF4F2",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    minWidth: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 20,
    color: "#0F4C43",
    fontFamily: "MehrNastaleeq",
    textAlign: "center",
  },
  pageContainer: {
    alignItems: "flex-start",
  },
  pageLabel: {
    fontSize: 11,
    fontFamily: "MehrNastaleeq",
    color: "#252827",
    marginBottom: -2,
  },
  cardPage: {
    fontSize: 18,
    color: "#D4AF37",
    fontFamily: "MehrNastaleeq",
  },

  // PDF Viewer Component Setup
  pdfCanvasElement: {
    flex: 1,
    width,
    height,
    backgroundColor: "#1A1A1A",
  },

  // Bottom Fixed Structural Elements
  bottomActionsBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingTop: 16,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  primaryActionBtn: {
    backgroundColor: "#0F4C43",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryActionText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "MehrNastaleeq",
  },
  floatingBackBtn: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#0F4C43",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: "#D4AF37",
  },
  backText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "MehrNastaleeq",
  },
  subListContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 40,
  },
  subIndexRow: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 6,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
  },
  subIndexTitle: {
    fontSize: 22,
    fontFamily: "Amiri-Regular",
    // Changed to Amiri-Regular for clean execution of dashes/coupletscolor: "#0F4C43",},
    
  },
  subPageContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  subPageLabel: {
    fontSize: 13,
    fontFamily: "Amiri-Regular",
    color: "#757575",
    marginLeft: 6,
  },
  subPageNumber: {
    fontSize: 16,
    fontFamily: "Amiri-Regular",
    color: "#0F4C43",
    fontWeight: "bold",
  },});

