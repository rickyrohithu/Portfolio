import { useState, useEffect } from 'react';

/**
 * useStats - Hook to fetch public stats and activity calendars for
 * GitHub, Codeforces, and LeetCode. No authentication tokens or cookies
 * are required since it queries public endpoints, preventing CORS and token expiry issues.
 */
export default function useStats() {
  const [stats, setStats] = useState({
    github: { activeDays: 0, openPRs: 0, activeDates: [] },
    codeforces: { activeDays: 0, solvedLastYear: 0, activeDates: [] },
    leetcode: { activeDays: 0, solvedLastYear: 0, activeDates: [] },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configuration for usernames/handles
  const GITHUB_USERNAME = 'rickyrohithu';
  const CODEFORCES_HANDLE = 'rohith_jpg';
  const LEETCODE_USERNAME = 'rohith_jpg';

  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        const oneYearAgoStr = oneYearAgo.toISOString().split('T')[0];

        // 1. Fetch GitHub Stats
        // Contributions calendar: uses jogruber's public contributions API
        const githubCalPromise = fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`)
          .then((res) => {
            if (!res.ok) throw new Error('GitHub calendar fetch failed');
            return res.json();
          })
          .catch((err) => {
            console.error(err);
            return null;
          });

        // PR Count: queries public GitHub issues search
        const githubPRsPromise = fetch(`https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr`)
          .then((res) => {
            if (!res.ok) throw new Error('GitHub PR search failed');
            return res.json();
          })
          .catch((err) => {
            console.error(err);
            return null;
          });

        // 2. Fetch Codeforces Stats
        const codeforcesPromise = fetch(`https://codeforces.com/api/user.status?handle=${CODEFORCES_HANDLE}`)
          .then((res) => {
            if (!res.ok) throw new Error('Codeforces status fetch failed');
            return res.json();
          })
          .catch((err) => {
            console.error(err);
            return null;
          });

        // 3. Fetch LeetCode Stats
        // Calendar: uses alfa-leetcode-api public endpoint
        const leetcodeCalPromise = fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/calendar`)
          .then((res) => {
            if (!res.ok) throw new Error('LeetCode calendar fetch failed');
            return res.json();
          })
          .catch((err) => {
            console.error(err);
            return null;
          });

        // Solved count: uses alfa-leetcode-api public solved endpoint
        const leetcodeSolvedPromise = fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/solved`)
          .then((res) => {
            if (!res.ok) throw new Error('LeetCode solved stats fetch failed');
            return res.json();
          })
          .catch((err) => {
            console.error(err);
            return null;
          });

        const [ghCal, ghPRs, cfData, lcCal, lcSolved] = await Promise.all([
          githubCalPromise,
          githubPRsPromise,
          codeforcesPromise,
          leetcodeCalPromise,
          leetcodeSolvedPromise,
        ]);

        // --- Process GitHub Data ---
        let ghActiveDates = [];
        let ghActiveDaysCount = 0;
        if (ghCal && ghCal.contributions) {
          ghCal.contributions.forEach((day) => {
            if (day.date >= oneYearAgoStr && day.count > 0) {
              ghActiveDates.push(day.date);
            }
          });
          ghActiveDaysCount = ghActiveDates.length;
        }
        const ghPRCount = ghPRs ? ghPRs.total_count : 0;

        // --- Process Codeforces Data ---
        let cfActiveDates = [];
        let cfSolvedCount = 0;
        if (cfData && cfData.status === 'OK' && cfData.result) {
          const cfActiveSet = new Set();
          const cfSolvedSet = new Set();
          cfData.result.forEach((sub) => {
            if (sub.verdict === 'OK') {
              const subDate = new Date(sub.creationTimeSeconds * 1000);
              if (subDate >= oneYearAgo) {
                const dateStr = subDate.toISOString().split('T')[0];
                cfActiveSet.add(dateStr);
                cfSolvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
              }
            }
          });
          cfActiveDates = Array.from(cfActiveSet);
          cfSolvedCount = cfSolvedSet.size;
        }

        // --- Process LeetCode Data ---
        let lcActiveDates = [];
        if (lcCal && lcCal.submissionCalendar) {
          try {
            const parsedCal = JSON.parse(lcCal.submissionCalendar);
            const lcActiveSet = new Set();
            Object.keys(parsedCal).forEach((timestamp) => {
              const subDate = new Date(parseInt(timestamp) * 1000);
              if (subDate >= oneYearAgo) {
                const dateStr = subDate.toISOString().split('T')[0];
                lcActiveSet.add(dateStr);
              }
            });
            lcActiveDates = Array.from(lcActiveSet);
          } catch (e) {
            console.error('Error parsing LeetCode submission calendar', e);
          }
        }
        const lcSolvedCount = lcSolved ? lcSolved.solvedProblem : 0;

        setStats({
          github: {
            activeDays: ghActiveDaysCount,
            openPRs: ghPRCount,
            activeDates: ghActiveDates,
          },
          codeforces: {
            activeDays: cfActiveDates.length,
            solvedLastYear: cfSolvedCount,
            activeDates: cfActiveDates,
          },
          leetcode: {
            activeDays: lcActiveDates.length,
            solvedLastYear: lcSolvedCount,
            activeDates: lcActiveDates,
          },
        });
      } catch (err) {
        console.error('Error loading coding stats', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllStats();
  }, []);

  return { stats, loading, error };
}
