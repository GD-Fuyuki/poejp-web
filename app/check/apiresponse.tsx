import React, { useState } from 'react';

interface ProfileData {
  // プロファイルデータの型を定義
  // 実際のAPIレスポンスに合わせて適切に型を定義してください
  [key: string]: any;
}

const ProfileFetcher: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://mock.poe-jp.com/profile');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ProfileData = await response.json();
      setProfileData(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchProfile} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Profile'}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {profileData && (
        <pre style={{
          backgroundColor: '#f4f4f4',
          padding: '10px',
          borderRadius: '5px',
          overflowX: 'auto',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word'
        }}>
          {JSON.stringify(profileData, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default ProfileFetcher;