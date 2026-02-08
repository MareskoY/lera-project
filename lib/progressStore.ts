"use client";

import { create } from "zustand";
import {
  lsGetBoolean,
  lsGetNumber,
  lsSetBoolean,
  lsSetNumber,
} from "@/lib/storage";

const K = {
  achievementsCompleted: "progress.achievements.completed",
  achievementsSlideIndex: "progress.achievements.slideIndex",
  scheduleCompleted: "progress.schedule.completed",
  scheduleStep1Skipped: "schedule.flow.flowersSkipped",
  scheduleStep1Complained: "schedule.flow.flowersComplained",
  scheduleStep2Ready: "schedule.flow.readyConfirmed",
  scheduleHotelHidden: "schedule.flow.hotelHidden",
  giftsEnvelope1Opened: "gifts.envelope1.opened",
  giftsEnvelope2Opened: "gifts.envelope2.opened",
} as const;

type ProgressState = {
  hydrated: boolean;

  achievementsCompleted: boolean;
  achievementsSlideIndex: number;

  scheduleCompleted: boolean;
  schedule: {
    flowersSkipped: boolean;
    flowersComplained: boolean;
    readyConfirmed: boolean;
    hotelHidden: boolean;
  };

  gifts: {
    envelope1Opened: boolean;
    envelope2Opened: boolean;
  };

  hydrateFromStorage: () => void;

  setAchievementsSlideIndex: (idx: number) => void;
  completeAchievements: () => void;
  resetAchievements: () => void;

  skipFlowers: () => void;
  complainFlowers: () => void;
  confirmReady: () => void;
  completeSchedule: () => void;
  hideHotel: () => void;

  openEnvelope: (id: "envelope1" | "envelope2") => void;
};

export const useProgressStore = create<ProgressState>((set, get) => ({
  hydrated: false,

  achievementsCompleted: false,
  achievementsSlideIndex: 0,

  scheduleCompleted: false,
  schedule: {
    flowersSkipped: false,
    flowersComplained: false,
    readyConfirmed: false,
    hotelHidden: false,
  },

  gifts: {
    envelope1Opened: false,
    envelope2Opened: false,
  },

  hydrateFromStorage: () => {
    if (get().hydrated) return;
    set({
      hydrated: true,
      achievementsCompleted: lsGetBoolean(K.achievementsCompleted, false),
      achievementsSlideIndex: lsGetNumber(K.achievementsSlideIndex, 0),
      scheduleCompleted: lsGetBoolean(K.scheduleCompleted, false),
      schedule: {
        flowersSkipped: lsGetBoolean(K.scheduleStep1Skipped, false),
        flowersComplained: lsGetBoolean(K.scheduleStep1Complained, false),
        readyConfirmed: lsGetBoolean(K.scheduleStep2Ready, false),
        hotelHidden: lsGetBoolean(K.scheduleHotelHidden, false),
      },
      gifts: {
        envelope1Opened: lsGetBoolean(K.giftsEnvelope1Opened, false),
        envelope2Opened: lsGetBoolean(K.giftsEnvelope2Opened, false),
      },
    });
  },

  setAchievementsSlideIndex: (idx) => {
    const clamped = Math.max(0, Math.floor(idx));
    set({ achievementsSlideIndex: clamped });
    lsSetNumber(K.achievementsSlideIndex, clamped);
  },

  completeAchievements: () => {
    set({ achievementsCompleted: true });
    lsSetBoolean(K.achievementsCompleted, true);
  },

  resetAchievements: () => {
    set({ achievementsCompleted: false, achievementsSlideIndex: 0 });
    lsSetBoolean(K.achievementsCompleted, false);
    lsSetNumber(K.achievementsSlideIndex, 0);
  },

  skipFlowers: () => {
    set((s) => ({ schedule: { ...s.schedule, flowersSkipped: true } }));
    lsSetBoolean(K.scheduleStep1Skipped, true);
  },

  complainFlowers: () => {
    set((s) => ({ schedule: { ...s.schedule, flowersComplained: true } }));
    lsSetBoolean(K.scheduleStep1Complained, true);
  },

  confirmReady: () => {
    set((s) => ({ schedule: { ...s.schedule, readyConfirmed: true } }));
    lsSetBoolean(K.scheduleStep2Ready, true);
  },

  hideHotel: () => {
    set((s) => ({ schedule: { ...s.schedule, hotelHidden: true } }));
    lsSetBoolean(K.scheduleHotelHidden, true);
  },

  completeSchedule: () => {
    set({ scheduleCompleted: true });
    lsSetBoolean(K.scheduleCompleted, true);
  },

  openEnvelope: (id) => {
    if (id === "envelope1") {
      set((s) => ({ gifts: { ...s.gifts, envelope1Opened: true } }));
      lsSetBoolean(K.giftsEnvelope1Opened, true);
      return;
    }
    set((s) => ({ gifts: { ...s.gifts, envelope2Opened: true } }));
    lsSetBoolean(K.giftsEnvelope2Opened, true);
  },
}));


