const common = {
  viewBox: '0 0 32 32',
  className: 'ico',
  'aria-hidden': true,
};

export function Icon({ name }) {
  if (name === 'scale') {
    return (
      <svg {...common}>
        <rect className="line" x="14.2" y="5" width="3.6" height="22" rx="1.8" />
        <rect className="line" x="5" y="13" width="22" height="3.6" rx="1.8" />
        <circle className="tone" cx="16" cy="14.8" r="2.5" />
      </svg>
    );
  }
  if (name === 'shield') {
    return (
      <svg {...common}>
        <rect className="line" x="7" y="4" width="18" height="23" rx="9" />
        <circle className="tone" cx="16" cy="14" r="3.2" />
      </svg>
    );
  }
  if (name === 'check') {
    return (
      <svg {...common}>
        <circle className="line" cx="16" cy="16" r="10" />
        <path className="mark" d="m11 16.6 3.1 3.1 6.4-7.2" />
      </svg>
    );
  }
  if (name === 'spark') {
    return (
      <svg {...common}>
        <circle className="line" cx="16" cy="16" r="3.2" />
        <circle className="tone" cx="16" cy="6.2" r="2" />
        <circle className="tone" cx="16" cy="25.8" r="2" />
        <circle className="tone" cx="6.2" cy="16" r="2" />
        <circle className="tone" cx="25.8" cy="16" r="2" />
      </svg>
    );
  }
  if (name === 'hands') {
    return (
      <svg {...common}>
        <rect className="line" x="4" y="8" width="16" height="6" rx="3" />
        <rect className="line" x="4" y="17" width="16" height="6" rx="3" />
        <circle className="tone" cx="24" cy="15.5" r="4" />
      </svg>
    );
  }
  if (name === 'pin') {
    return (
      <svg {...common}>
        <circle className="tone" cx="16" cy="11" r="4.2" />
        <rect className="line" x="14.2" y="15" width="3.6" height="11" rx="1.8" />
      </svg>
    );
  }
  if (name === 'phone') {
    return (
      <svg {...common}>
        <rect className="line" x="9" y="4" width="14" height="24" rx="3.5" />
        <circle className="tone" cx="16" cy="22.5" r="1.7" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect className="line" x="4" y="8" width="24" height="16" rx="3" />
      <circle className="tone" cx="23" cy="19" r="2.2" />
    </svg>
  );
}
