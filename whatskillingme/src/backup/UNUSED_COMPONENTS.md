# Unused Components

The following components are not used in the simplified version of the app but are preserved for future reference:

## Screens
- LogEntryScreen.tsx
- HistoryScreen.tsx
- ResultsScreen.tsx
- DashboardScreen.tsx
- Onboarding1Screen.tsx
- Onboarding2Screen.tsx
- Onboarding3Screen.tsx
- Onboarding4Screen.tsx
- Onboarding5Screen.tsx
- WelcomeScreen.tsx
- ProfileScreen.tsx
- RecommendationsScreen.tsx
- QuestionnaireScreen.tsx
- DailyLogScreen.tsx
- ChallengesScreen.tsx
- ChallengeDetailScreen.tsx
- InsightsScreen.tsx

## Components
- FakeDataLoader.tsx
- TabBar.tsx
- EmptyState.tsx
- ShareCard.tsx
- SectionList.tsx
- SectionNavigation.tsx
- SectionHeader.tsx
- QuestionRenderer.tsx
- TotalImpactSummary.tsx
- ProgressBar.tsx
- RecommendationItem.tsx
- ImpactFactor.tsx
- Slider.tsx
- Select.tsx

## Utilities
- fakeDataUtils.ts
- storageUtils.ts (partially used)

## Types
- LifestyleFactorImpact
- Recommendation
- UserProfile
- UserMilestone
- QuestionnaireSection
- Question
- LifestyleItem
- Challenge
- Streak
- MainTabParamList

## How to Reincorporate

If you want to reincorporate any of these components in the future:

1. Check if the component depends on any other components or types
2. Uncomment the relevant types in `src/types/index.ts`
3. Import the component in the appropriate file
4. Update the navigation if needed in `src/navigation/AppNavigator.tsx`

## Note

The simplified app focuses on the core functionality of logging activities and getting lifespan impact calculations. The components listed above provide additional features like onboarding, questionnaires, challenges, and detailed analytics that can be added back in the future. 