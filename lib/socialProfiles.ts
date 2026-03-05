export const WEBSITE_URL = 'https://resume-sushiinudesu.vercel.app/';
export const GITHUB_PROFILE_URL = 'https://github.com/sushiinudesu';
export const LINKEDIN_PROFILE_URL = 'https://linkedin.com/in/sushiinudesu';

export const schemaSocialProfiles = [GITHUB_PROFILE_URL, LINKEDIN_PROFILE_URL];

export function getGitHubAvatarUrl(profileUrl: string): string | undefined {
  try {
    const parsed = new URL(profileUrl);
    const username = parsed.pathname.split('/').filter(Boolean)[0];

    if (!username) {
      return undefined;
    }

    return `https://github.com/${username}.png`;
  } catch {
    return undefined;
  }
}
