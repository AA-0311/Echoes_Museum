export const EMOTIONS = [
    'wonder',
    'courage',
    'joy',
    'love',
    'resilience',
    'hope'
];

export const EMOTION_REQUIREMENTS = {
    wonder: 3,
    courage: 3,
    joy: 3,
    love: 3,
    resilience: 3,
    hope: 3
};

// Application State
export const AppState = {
    userName: '',
    memberCount: 0,
    currentEmotionIndex: 0, 
    viewedArtifacts: new Set(),
    viewed360: new Set(),
    quizCompleted: false,
    
    isEmotionUnlocked(emotionId) {
        return true;
    },
    
    markArtifactViewed(emotionId, artifactId) {
        this.viewedArtifacts.add(`${emotionId}_${artifactId}`);
        this.checkProgression(emotionId);
    },
    
    mark360Viewed(emotionId, artifactId) {
        this.viewed360.add(`${emotionId}_${artifactId}`);
        this.checkProgression(emotionId);
    },
    
    checkProgression(emotionId) {
        const index = EMOTIONS.indexOf(emotionId);
        if (index !== this.currentEmotionIndex) return; // Only progress if we're on the current one

        const requiredCount = EMOTION_REQUIREMENTS[emotionId];
        let hoverCount = 0;
        let view360Count = 0;
        
        for (let i = 1; i <= requiredCount; i++) {
            if (this.viewedArtifacts.has(`${emotionId}_${i}`)) hoverCount++;
            if (this.viewed360.has(`${emotionId}_${i}`)) view360Count++;
        }
        
        if (hoverCount === requiredCount && view360Count === requiredCount) {
            if (this.currentEmotionIndex < EMOTIONS.length - 1) {
                this.currentEmotionIndex++;
                document.dispatchEvent(new CustomEvent('regionUnlocked', { 
                    detail: { newRegion: EMOTIONS[this.currentEmotionIndex] }
                }));
            } else if (this.currentEmotionIndex === EMOTIONS.length - 1) {
                // Journey complete
                document.dispatchEvent(new CustomEvent('journeyComplete'));
            }
        }
    },
    
    isJourneyComplete() {
        return true;
    },
    
    reset() {
        this.userName = '';
        this.memberCount = 0;
        this.currentEmotionIndex = 0;
        this.viewedArtifacts.clear();
        this.viewed360.clear();
        this.quizCompleted = false;
    }
};
