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
        paddingTop: 35,
        paddingBottom: 10,
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
        paddingBottom: 37, // Prevents elements from hiding behind the bottom button bar
    },
    gridRow: {
        flexDirection: I18nManager.isRTL ? "row" : "row-reverse",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    card: {
        backgroundColor: "#FFFFFF",
        width: (width - 46) / 2,
        borderRadius: 16,
        padding: 6,
        flexDirection: "row",
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
    topSearchContainer: {
        width: "115%",
        paddingHorizontal: 15,
        marginVertical: 0,
        paddingTop: 2,
        paddingBottom: 5,
        alignItems: "center",
        justifyContent: "center",
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
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        width: "100%",
        height: 46,
        borderRadius: 23,
        paddingHorizontal: 25,
        paddingTop: 6,
        paddingBottom: 4,
        fontSize: 18,
        fontFamily: "MehrNastaleeq",
        color: "#FFFFFF",
        textAlign: "center",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.3)",
        marginTop: 2,
        marginBottom: 0,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Darkens the background behind the alert
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "#FFFFFF",
        width: "80%",
        borderRadius: 20,
        padding: 24,
        alignItems: "center",
        elevation: 10, // Drop shadow for Android
        shadowColor: "#000", // Drop shadow for iOS
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    modalTitle: {
        fontSize: 22,
        fontFamily: "MehrNastaleeq",
        color: "#0F4C43",
        textAlign: "center",
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        fontFamily: "MehrNastaleeq",
        color: "#555555",
        textAlign: "center",
        marginBottom: 20,
        lineHeight: 24,
    },
    modalButton: {
        backgroundColor: "#0F4C43",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20,
        minWidth: 100,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#FFD700", // Elegant gold border touch
    },
    modalButtonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontFamily: "MehrNastaleeq",
    },
    bottomNavBar: {
        backgroundColor: "#0F4C43", // Matching dark green theme
        flexDirection: "row-reverse", // Right-to-Left alignment for Urdu interface context
        height: 60,
        width: "100%",
        justifyContent: "space-around",
        alignItems: "center",
        borderTopWidth: 1,
        borderColor: "#FFD700", // Elegant thin gold divider border line
        paddingBottom: 5, // Provides spacing from the phone's native bottom gesture bar
    },
    bottomNavTab: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
    bottomNavText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontFamily: "Amiri-Regular",
        textAlign: "center",
    },

    aboutContentCard: {
        backgroundColor: "#FFFFFF",
        margin: 20,
        padding: 25,
        borderRadius: 15,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        alignItems: "center",
    },
    aboutHeadingText: {
        fontSize: 24,
        fontFamily: "Amiri-Regular",
        color: "#0F4C43",
        marginBottom: 15,
        textAlign: "center",
    },
    aboutBodyText: {
        fontSize: 16,
        fontFamily: "MehrNastaleeq",
        color: "#444444",
        textAlign: "justify", // Aligns block text cleanly along both margins
        lineHeight: 28,
        marginBottom: 15,
    },
    aboutFooterVersion: {
        fontSize: 12,
        fontFamily: "Amiri-Regular",
        color: "#9EA7A6",
        marginTop: 25,
        textAlign: "right", // 👈 CHANGED: Keeps the version token clean and tucked safely into the corner column
        width: "100%",
    },
    aboutDivider: {
        width: "80%",
        height: 1,
        backgroundColor: "#E0F2F1",
        marginVertical: 15,
    },
    developerHeadingText: {
        fontSize: 20,
        fontFamily: "MehrNastaleeq",
        color: "#0F4C43",
        marginBottom: 10,
        textAlign: "center",
    },
    prayerRequestText: {
        fontSize: 16,
        fontFamily: "Amiri-Regular",
        color: "#0F4C43", // Using the theme green color to make the prayer request stand out
        textAlign: "center",
        lineHeight: 26,
        fontWeight: "bold",
        backgroundColor: "#E0F2F1", // Light tint background bubble to highlight the request
        padding: 12,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 15,
    },



    // ==========================================
    // DARK MODE STYLES EXTENSIONS
    // ==========================================
    indexScreenDark: {
        flex: 1,
        backgroundColor: "#121212", // Clean Material dark theme background
    },
    cardDark: {
        backgroundColor: "#1E1E1E", // Darker card background surface
        width: width * 0.44,
        height: 90,
        borderRadius: 15,
        marginVertical: 8,
        padding: 12,
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        elevation: 3,
    },
    letterBadgeDark: {
        backgroundColor: "#2C2C2C",
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    cardTitleDark: {
        fontSize: 20,
        fontFamily: "MehrNastaleeq",
        color: "#FFD700", // Gold looks exceptionally premium on dark grey modes
        textAlign: "center",
    },
    cardPageDark: {
        fontSize: 16,
        fontFamily: "Amiri-Regular",
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    bottomNavBarDark: {
        backgroundColor: "#1E1E1E", // Dark grey navigation strip footer
        flexDirection: "row-reverse",
        height: 60,
        width: "100%",
        justifyContent: "space-around",
        alignItems: "center",
        borderTopWidth: 1,
        borderColor: "#0F4C43", // Subtle green top frame divider line
        paddingBottom: 5,
    },
    subIndexRowDark: {
        backgroundColor: "#1E1E1E",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginVertical: 6,
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        elevation: 2,
    },
    subIndexTitleDark: {
        fontSize: 22,
        fontFamily: "Amiri-Regular",
        color: "#FFD700",
    },
    subPageNumberDark: {
        fontSize: 16,
        fontFamily: "Amiri-Regular",
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    aboutContentCardDark: {
        backgroundColor: "#1E1E1E",
        margin: 20,
        padding: 25,
        borderRadius: 15,
        elevation: 4,
        alignItems: "center",
    },
    aboutHeadingTextDark: {
        fontSize: 24,
        fontFamily: "MehrNastaleeq",
        color: "#FFD700",
        marginBottom: 15,
        textAlign: "center",
    },
    aboutHeaderButton: {
        position: "absolute",
        left: 20, // Positions it on the far left side of the green top banner
        backgroundColor: "rgba(255, 255, 255, 0.15)", // Translucent white pill accent matching the search bar
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.25)",
    },
    aboutHeaderButtonText: {
        color: "#FFFFFF",
        fontSize: 12,
        fontFamily: "Amiri-Regular",
        fontWeight: "bold",
    },

    headerTitleRow: {
        width: "100%",
        flexDirection: "row-reverse", // Handles Right-to-Left alignment safely for Urdu apps
        alignItems: "center",
        justifyContent: "space-between", // Pushes the items to the edges evenly
        paddingHorizontal: 20,
        marginBottom: 5,
    },
    headerSideSpacer: {
        width: 36, // Must match the exact width of the aboutHeaderCircle button for pixel-perfect title centering
    },
    aboutHeaderCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "rgba(255, 255, 255, 0.12)", // Premium translucent glassmorphism accent
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
    },
    aboutHeaderCircleText: {
        color: "#FFD700", // Sharp gold color for the info symbol inside the green banner
        fontSize: 18,
        fontFamily: "Amiri-Regular",
        fontWeight: "bold",
        // Small vertical correction since Amiri text sits a fraction higher natively
        paddingTop: 2,
    },
    developerNameContainer: {
        width: "100%",
        alignItems: "flex-start", // Keeps the container box anchored on the screen left layout margin
        marginTop: 15,
        paddingHorizontal: 15,
    },
    developerLabelText: {
        alignItems: "flex-start",
        fontSize: 20,
        fontFamily: "MehrNastaleeq",
        color: "#757575",
        textAlign: "right",
    },
    developerNameText: {
        fontSize: 18,
        fontFamily: "MehrNastaleeq",
        color: "#0F4C43",
        marginTop: 2,
        textAlign: "right",
    },
    aboutScrollContainer: {
        paddingBottom: 30,
    },
    developerSubText: {
        fontSize: 14,
        fontFamily: "Amiri-Regular",
        color: "#555555",
        marginTop: 2,
        textAlign: "right",
    },
    developerEmailText: {
        fontSize: 14,
        fontFamily: "Amiri-Regular",
        color: "#0F4C43",
        marginTop: 4,
        textAlign: "right",
        writingDirection: "ltr",
        textDecorationLine: "underline",
    },
});
