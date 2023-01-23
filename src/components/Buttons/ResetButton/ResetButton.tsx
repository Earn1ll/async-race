import './ResetButton.scss';

export default function ResetBtn(props: { setResetRace: React.Dispatch<React.SetStateAction<boolean>> }) {

  const resetButtonHandler = () => {
      props.setResetRace(true);
    setTimeout(() => {
      props.setResetRace(false);
    }, 50);
  };

  return (
    <button className="reset-button" onClick={resetButtonHandler}>
      Reset
    </button>
  );
  }