import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Platform } from 'react-native';

interface SizePayload {
    width: number;
    height: number;
    isPad: boolean;
}

interface ApiErrorPayload {
    error: boolean;
    errorCode: number | null;
}

interface SizeState {
    isPad: boolean | null;
    isEmulator: boolean;
    isAndroid: boolean;
    isIos: boolean;
    getGlobalLoading: boolean;
    keyboard: number;
    tabBar: boolean;
    apiError: boolean;
    apiErrorCode: number | null;
    timer: number;
    width?: number;
    height?: number;

    // Dinamik hesaplanan ölçüler
    h1?: number; h2?: number; h3?: number; h4?: number; h5?: number; h6?: number;
    t0?: number; t1?: number; t2?: number; t3?: number; t4?: number; t5?: number; t6?: number; t7?: number;
    g0?: number; g1?: number; g2?: number; g3?: number; g4?: number; g5?: number; g6?: number; g7?: number;
    s0?: number; s1?: number; s2?: number; s3?: number; s4?: number; s5?: number; s6?: number;

    w1px?: number; w4px?: number; w8px?: number; w12px?: number; w16px?: number; w20px?: number;
    h1px?: number; h4px?: number; h8px?: number; h12px?: number; h16px?: number; h20px?: number;

    fs1px?: number; fs4px?: number; fs8px?: number; fs12px?: number; fs14px?: number; fs16px?: number; fs18px?: number; fs20px?: number;
}

const initialState: SizeState = {
    isPad: null,
    isEmulator: false,
    isAndroid: false,
    isIos: false,
    getGlobalLoading: false,
    keyboard: 0,
    tabBar: true,
    apiError: false,
    apiErrorCode: null,
    timer: 900000,
};

const sizeSlice = createSlice({
    name: 'size',
    initialState,
    reducers: {
        updateSize(state, action: PayloadAction<SizePayload>) {
            const { width, height, isPad } = action.payload;

            const oldGuidelineBaseWidth = 834;
            const guidelineBaseWidth = 375;
            const guidelineBaseHeight = 812;

            const scale = (size: number) => (width / oldGuidelineBaseWidth) * size;

            const oldModerateScale = (size: number, factor = 0.5) =>
                size + (scale(size) - size) * factor;

            const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;

            const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;

            const moderateScale = (size: number, factor = 0.5) =>
                size + (horizontalScale(size) - size) * factor;

            if (isPad) {
                state.h1 = oldModerateScale(40);
                state.h2 = oldModerateScale(35);
                state.h3 = oldModerateScale(32);
                state.h4 = oldModerateScale(30);
                state.h5 = oldModerateScale(27);
                state.h6 = oldModerateScale(25);

                state.t0 = oldModerateScale(29);
                state.t1 = oldModerateScale(25);
                state.t2 = oldModerateScale(21);
                state.t3 = oldModerateScale(18);
                state.t4 = oldModerateScale(16);
                state.t5 = oldModerateScale(14);
                state.t6 = oldModerateScale(12);
                state.t7 = oldModerateScale(10);

                state.s0 = oldModerateScale(60);
                state.s1 = oldModerateScale(55);
                state.s2 = oldModerateScale(50);
                state.s3 = oldModerateScale(45);
                state.s4 = oldModerateScale(40);
                state.s5 = oldModerateScale(35);
                state.s6 = oldModerateScale(30);

                state.g0 = oldModerateScale(44);
                state.g1 = oldModerateScale(37);
                state.g2 = oldModerateScale(31);
                state.g3 = oldModerateScale(27);
                state.g4 = oldModerateScale(24);
                state.g5 = oldModerateScale(21);
                state.g6 = oldModerateScale(18);
                state.g7 = oldModerateScale(12);

                state.w1px = horizontalScale(1);
                state.w4px = horizontalScale(4);
                state.w8px = horizontalScale(8);
                state.w12px = horizontalScale(12);
                state.w16px = horizontalScale(16);
                state.w20px = horizontalScale(20);

                state.h1px = verticalScale(1);
                state.h4px = verticalScale(4);
                state.h8px = verticalScale(8);
                state.h12px = verticalScale(12);
                state.h16px = verticalScale(16);
                state.h20px = verticalScale(20);

                state.fs1px = moderateScale(1);
                state.fs4px = moderateScale(4);
                state.fs8px = moderateScale(8);
                state.fs12px = moderateScale(12);
                state.fs14px = moderateScale(14);
                state.fs16px = moderateScale(16);
                state.fs18px = moderateScale(18);
                state.fs20px = moderateScale(20);
            } else {
                state.h1 = oldModerateScale(45);
                state.h2 = oldModerateScale(39);
                state.h3 = oldModerateScale(36);
                state.h4 = oldModerateScale(34);
                state.h5 = oldModerateScale(30);
                state.h6 = oldModerateScale(28);

                state.t0 = oldModerateScale(44);
                state.t1 = oldModerateScale(37);
                state.t2 = oldModerateScale(31);
                state.t3 = oldModerateScale(27);
                state.t4 = oldModerateScale(24);
                state.t5 = oldModerateScale(21);
                state.t6 = oldModerateScale(18);
                state.t7 = oldModerateScale(15);

                state.s0 = oldModerateScale(60);
                state.s1 = oldModerateScale(55);
                state.s2 = oldModerateScale(50);
                state.s3 = oldModerateScale(45);
                state.s4 = oldModerateScale(40);
                state.s5 = oldModerateScale(35);
                state.s6 = oldModerateScale(30);

                state.g0 = oldModerateScale(45);
                state.g1 = oldModerateScale(40);
                state.g2 = oldModerateScale(35);
                state.g3 = oldModerateScale(30);
                state.g4 = oldModerateScale(25);
                state.g5 = oldModerateScale(20);
                state.g6 = oldModerateScale(15);
                state.g7 = oldModerateScale(10);

                state.w1px = horizontalScale(1);
                state.w4px = horizontalScale(4);
                state.w8px = horizontalScale(8);
                state.w12px = horizontalScale(12);
                state.w16px = horizontalScale(16);
                state.w20px = horizontalScale(20);

                state.h1px = verticalScale(1);
                state.h4px = verticalScale(4);
                state.h8px = verticalScale(8);
                state.h12px = verticalScale(12);
                state.h16px = verticalScale(16);
                state.h20px = verticalScale(20);

                state.fs1px = moderateScale(1);
                state.fs4px = moderateScale(4);
                state.fs8px = moderateScale(8);
                state.fs12px = moderateScale(12);
                state.fs14px = moderateScale(14);
                state.fs16px = moderateScale(16);
                state.fs18px = moderateScale(18);
                state.fs20px = moderateScale(20);
            }

            state.width = width;
            state.height = height;
            state.isPad = isPad;
            state.isAndroid = Platform.OS === 'android';
            state.isIos = Platform.OS === 'ios';
        },

        updateKeyboard(state, action: PayloadAction<number>) {
            state.keyboard = action.payload;
        },

        updateTabBar(state, action: PayloadAction<boolean>) {
            state.tabBar = action.payload;
        },

        updateApiError(state, action: PayloadAction<ApiErrorPayload>) {
            state.apiError = action.payload.error;
            state.apiErrorCode = action.payload.errorCode;
        },

        updateTimer(state, action: PayloadAction<number>) {
            state.timer = action.payload;
        },

        setGlobalLoading(state, action: PayloadAction<boolean>) {
            state.getGlobalLoading = action.payload;
        },
    },
});

export const {
    updateSize,
    updateKeyboard,
    updateTabBar,
    updateApiError,
    updateTimer,
    setGlobalLoading,
} = sizeSlice.actions;

export default sizeSlice.reducer;
