import { Asset } from "expo-asset";
import { File, Paths } from "expo-file-system";
import { useFonts } from "expo-font";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  I18nManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Pdf, { PdfRef } from "react-native-pdf";

// Force RTL layout orientation natively
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

interface IndexItem {
  id: number;
  title: string;
  page: number;
  targetPage?: number;
}

const PDF_INDEX: IndexItem[] = [
  { id: 1, title: "ا (الف)", page: 3, targetPage: 4 },
  { id: 2, title: "ب", page: 61, targetPage: 62 },
  { id: 3, title: "ت", page: 71, targetPage: 72 },
  { id: 4, title: "ث", page: 119, targetPage: 120 },
  { id: 5, title: "ج", page: 120, targetPage: 121 },
  { id: 6, title: "ح", page: 127, targetPage: 128 },
  { id: 7, title: "خ", page: 137, targetPage: 138 },
  { id: 8, title: "د", page: 145, targetPage: 146 },
  { id: 9, title: "ذ", page: 149, targetPage: 150 },
  { id: 10, title: "ر", page: 152, targetPage: 153 },
  { id: 11, title: "ز", page: 161, targetPage: 162 },
  { id: 12, title: "س", page: 166, targetPage: 167 },
  { id: 13, title: "ش", page: 181, targetPage: 182 },
  { id: 14, title: "ص", page: 189, targetPage: 190 },
  { id: 15, title: "ض", page: 198, targetPage: 199 },
  { id: 16, title: "ط", page: 201, targetPage: 202 },
  { id: 17, title: "ظ", page: 207, targetPage: 208 },
  { id: 18, title: "ع", page: 209, targetPage: 210 },
  { id: 19, title: "غ", page: 227, targetPage: 228 },
  { id: 20, title: "ف", page: 231, targetPage: 232 },
  { id: 21, title: "ق", page: 239, targetPage: 240 },
  { id: 22, title: " ک", page: 251, targetPage: 252 },
  { id: 23, title: "ل", page: 259, targetPage: 260 },
  { id: 24, title: "م", page: 266, targetPage: 267 },
  { id: 25, title: "ن", page: 312, targetPage: 313 },
  { id: 26, title: "و", page: 340, targetPage: 341 },
  { id: 27, title: "ہ", page: 349, targetPage: 350 },
  { id: 28, title: "ی", page: 354, targetPage: 355 },
];

const toUrduNumber = (num: number | string): string => {
  const urduDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num
    .toString()
    .split('')
    .map((d) => urduDigits[parseInt(d, 10)])
    .join('');
};

const { width, height } = Dimensions.get("window");

export default function Index() {
  const pdfRef = useRef<PdfRef>(null);

  const [localPdfUri, setLocalPdfUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPdf, setShowPdf] = useState(false);
  const [targetPage, setTargetPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [fontsLoaded, fontError] = useFonts({
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
          const asset = Asset.fromModule(
            require("../../assets/SAHIH_LUGHAT_UL_QURAAN.pdf")
          );
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

  const navigateToPage = (item: IndexItem) => {
    const destination = item.targetPage ?? item.page;
    setTargetPage(destination);
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

  if (!showPdf) {
    return (
      <View style={styles.indexScreen}>
        {/* Header Block */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>صَحِیح لُغَاتُ القُرْآن</Text>
          <Text style={styles.subtitle}>فہرِستِ الفاظ</Text>
          <View style={styles.decoratorLine} />
        </View>

        {/* Modern 2-Column Grid List */}
        <FlatList
          data={PDF_INDEX}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigateToPage(item)}
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

        {/* Elegant Bottom Action Bar */}
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

      {/* Floating Action-Driven Back Button */}
      <TouchableOpacity
        style={styles.floatingBackBtn}
        onPress={() => setShowPdf(false)}
        activeOpacity={0.9}
      >
        <Text style={styles.backText}>واپس فہرست</Text>
      </TouchableOpacity>
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
    borderRadius: 25, alignItems: "center", justifyContent: "center", elevation: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, borderWidth: 1, borderColor: "#D4AF37",
  }, backText: { color: "#FFFFFF", fontSize: 18, fontFamily: "MehrNastaleeq", },
});
