import { Dimensions, I18nManager, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");
export const styles = StyleSheet.create({
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
        justifyContent: "center",
        alignItems: "center",
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
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginVertical: 6,
        flexDirection: "row",
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
        fontSize: 15,
        fontFamily: "MehrNastaleeq",
        color: "#757575",
        marginLeft: 6,
    },
    subPageNumber: {
        fontSize: 20,
        fontFamily: "MehrNastaleeq",
        color: "#0F4C43",
    },
    searchInput: {
        backgroundColor: "#FFFFFF",
        width: "90%",
        height: 50,
        borderRadius: 25,
        paddingHorizontal: 25,
        fontSize: 16,
        fontFamily: "MehrNastaleeq",
        color: "#0F4C43",
        textAlign: "right",
        borderWidth: 1,
        borderColor: "#E0F2F1",
        elevation: 3,
    },
});
