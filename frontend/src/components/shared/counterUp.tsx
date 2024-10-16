import CountUp from 'react-countup';

const CounterUp: React.FC<{ to: number }> = ({ to }) => {
  return (
    <CountUp
      start={0}
      enableScrollSpy
      duration={3}
      scrollSpyOnce={true}
      end={to}
      separator=""
    >
      {({ countUpRef }) => <span ref={countUpRef} />}
    </CountUp>
  );
};

export default CounterUp;
