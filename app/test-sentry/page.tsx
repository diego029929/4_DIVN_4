'use client';

export default function TestSentry() {
  return (
    <button
      onClick={() => {
        throw new Error('Test Sentry Frontend');
      }}
    >
      Test Sentry
    </button>
  );
}
