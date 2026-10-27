const common = {
  viewBox: '0 0 32 32',
  className: 'ico',
  fill: 'none',
  'aria-hidden': true,
};

export function Icon({ name }) {
  if (name === 'scale') {
    return (
      <svg {...common}>
        <path className="line" d="M16 5v22M10 27h12" />
        <path className="tone" d="M16 9H8.5L6 16a4 4 0 0 0 8 0L11.5 9M16 9h7.5L26 16a4 4 0 0 1-8 0L20.5 9" />
      </svg>
    );
  }
  if (name === 'shield') {
    return (
      <svg {...common}>
        <path className="line" d="M16 4 26 8v8c0 6.2-4.2 9.8-10 12-5.8-2.2-10-5.8-10-12V8l10-4Z" />
        <path className="tone" d="m12 16 2.6 2.6L20 13.2" />
      </svg>
    );
  }
  if (name === 'check') {
    return (
      <svg {...common}>
        <circle className="line" cx="16" cy="16" r="10" />
        <path className="tone" d="m11 16.5 3.2 3.2L21.5 12" />
      </svg>
    );
  }
  if (name === 'spark') {
    return (
      <svg {...common}>
        <path className="line" d="M16 4v6M16 22v6M4 16h6M22 16h6" />
        <path className="tone" d="M7.5 7.5 12 12M20 20l4.5 4.5M24.5 7.5 20 12M12 20l-4.5 4.5" />
      </svg>
    );
  }
  if (name === 'hands') {
    return (
      <svg {...common}>
        <path className="line" d="M8 18c2.2-1.2 4.2-1.2 6.2 0l1.8 1.2c2 1.2 4 1.2 6.2 0" />
        <path className="tone" d="M6 14.5c2.6-2 5.2-2 8 0M18 14.5c2.6-2 5.2-2 8 0M10 22.5c2 .8 4 .8 6 0s4-.8 6 0" />
      </svg>
    );
  }
  if (name === 'pin') {
    return (
      <svg {...common}>
        <path className="line" d="M16 28s8-7.2 8-14a8 8 0 1 0-16 0c0 6.8 8 14 8 14Z" />
        <circle className="tone" cx="16" cy="14" r="2.5" />
      </svg>
    );
  }
  if (name === 'phone') {
    return (
      <svg {...common}>
        <path className="line" d="M8 6h4l1.5 4-2 1.5a12 12 0 0 0 7 7L20 17l4 1.5V23a2 2 0 0 1-2 2A16 16 0 0 1 6 9a2 2 0 0 1 2-3Z" />
        <path className="tone" d="M20 6a6 6 0 0 1 6 6M20 10a2 2 0 0 1 2 2" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect className="line" x="5" y="7" width="22" height="16" rx="1.5" />
      <path className="tone" d="m6 9 10 7 10-7" />
    </svg>
  );
}
