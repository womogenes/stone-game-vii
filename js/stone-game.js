// Computational code

export const solve = (arr) => {
  let n = arr.length;

  let dp = [];
  for (let i = 0; i < n; i++) {
    dp.push(new Array(n).fill(''));
  }

  // Breadcrumbs
  let choice = [];
  for (let i = 0; i < n; i++) {
    choice.push(new Array(n).fill(''));
  }

  for (let start = n - 1; start >= 0; start--) {
    for (let end = start; end < n; end++) {
      // Base case
      if (start == end) {
        dp[start][end] = arr[start];
        continue;
      }

      // Find min loss route
      let takeLeft = dp[start + 1][end];
      let takeRight = dp[start][end - 1];
      if (takeLeft < takeRight) {
        choice[start][end] = 'S';
        dp[start][end] = arr[start] - takeLeft;
      } else {
        choice[start][end] = 'E';
        dp[start][end] = arr[end] - takeRight;
      }
    }
  }

  return { dp, choice };
};
