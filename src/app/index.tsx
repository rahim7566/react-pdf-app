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
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Pdf, { PdfRef } from "react-native-pdf";
import { IndexItem, PDF_INDEX } from "../constants/pdfIndex";
import { styles } from "../styles/appStyles";

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

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
                  <Text style={styles.subPageNumber}>{toUrduNumber(item.page)}</Text>
                  <Text style={styles.subPageLabel}>صفحہ </Text>
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

