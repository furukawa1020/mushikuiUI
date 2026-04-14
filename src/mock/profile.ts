export type SectionState = "hidden" | "teaser" | "matched" | "revealed";

export type ProfileSection = {
  id: string;
  category: string;
  title: string;
  text: string;
  tags: string[];
  state: SectionState;
  visibleRanges?: [number, number][]; // [start, length]
  matchedTags?: string[];
  nextUnlockHint?: string;
};

export type MockProfile = {
  id: string;
  alias: string;
  orbSeed: string; // Used for the PresenceOrb visual
  sharedTags: string[];
  sections: ProfileSection[];
};

export const MOCK_PROFILE: MockProfile = {
  id: "user-mikan",
  alias: "みかん",
  orbSeed: "mikan-warm-vibes",
  sharedTags: ["映画", "展示"],
  sections: [
    {
      id: "hobby",
      category: "趣味",
      title: "大切にしていること",
      text: "映画館の予告をずっと見ていたい",
      tags: ["映画", "映画館", "音響"],
      state: "matched",
      matchedTags: ["映画"],
    },
    {
      id: "interest",
      category: "最近気になること",
      title: "休日の過ごし方",
      text: "静かな展示をひとりで見に行きたい",
      tags: ["展示", "静寂", "散歩"],
      state: "teaser",
      visibleRanges: [[0, 2], [7, 2]], // "静な" ... "展示"
    },
    {
      id: "communication",
      category: "話しかけられ方",
      title: "心地よい距離感",
      text: "最初は短い一言だと助かる",
      tags: ["一言", "チャット"],
      state: "hidden",
      nextUnlockHint: "リアクション後に開示",
    },
    {
      id: "dislike",
      category: "苦手な状況",
      title: "避けたいこと",
      text: "人が多くて音が大きい場所は少し苦手",
      tags: ["騒音", "人混み"],
      state: "hidden",
      nextUnlockHint: "相互リアクション後に開示",
    },
    {
      id: "care",
      category: "配慮してほしいこと",
      title: "あらかじめ伝えたいこと",
      text: "返事が遅くても気にしないでほしい",
      tags: ["マイペース", "自律性"],
      state: "hidden",
      nextUnlockHint: "相互リアクション後に開示",
    },
    {
      id: "together",
      category: "一緒に行きたい",
      title: "誘いやすいもの",
      text: "展示か映画なら行きやすい",
      tags: ["展示", "映画"],
      state: "teaser",
      visibleRanges: [[0, 2], [5, 2]], // "展示" ... "映画"
    },
  ],
};

export const MY_PROFILE: MockProfile = {
  id: "user-me",
  alias: "自分",
  orbSeed: "my-orb-seed",
  sharedTags: [],
  sections: [
    {
      id: "hobby",
      category: "趣味",
      title: "好きなもの",
      text: "カメラを持って早朝の街を歩く",
      tags: ["カメラ", "写真", "早朝"],
      state: "revealed",
    },
    // ... other sections for settings preview
  ],
};
