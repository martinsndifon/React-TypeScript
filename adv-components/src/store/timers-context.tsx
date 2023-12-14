import { type ReactNode, createContext, useContext, useReducer } from 'react';

export type Timer = {
  name: string;
  duration: number;
};

type TimersState = {
  isRunning: boolean;
  timers: Timer[];
};

type TimersContextValue = TimersState & {
  addTimer: (timerData: Timer) => void;
  startTimers: () => void;
  stopTimers: () => void;
};

const TimersContext = createContext<TimersContextValue | null>(null);

const initialState: TimersState = {
  isRunning: false,
  timers: [],
};

type StartTimersAction = {
  type: 'START_TIMERS';
};

type StopTimersAction = {
  type: 'STOP_TIMERS';
};

type AddTimerAction = {
  type: 'ADD_TIMER';
  payload: Timer;
};

type ActionType = StartTimersAction | StopTimersAction | AddTimerAction;

function timersReducer(state: TimersState, action: ActionType): TimersState {
  switch (action.type) {
    case 'START_TIMERS':
      return {
        ...state,
        isRunning: true,
      };

    case 'STOP_TIMERS':
      return {
        ...state,
        isRunning: false,
      };

    case 'ADD_TIMER':
      return {
        ...state,
        timers: [
          ...state.timers,
          {
            name: action.payload.name,
            duration: action.payload.duration,
          },
        ],
      };

    default:
      throw new Error('Unknown action type');
  }
}

type TimersContextProviderProps = {
  children: ReactNode;
};

function TimersContextProvider({ children }: TimersContextProviderProps) {
  const [timersState, dispatch] = useReducer(timersReducer, initialState);

  const ctx: TimersContextValue = {
    timers: timersState.timers,
    isRunning: timersState.isRunning,
    addTimer(timerData) {
      dispatch({ type: 'ADD_TIMER', payload: timerData });
    },
    startTimers() {
      dispatch({ type: 'START_TIMERS' });
    },
    stopTimers() {
      dispatch({ type: 'STOP_TIMERS' });
    },
  };
  return (
    <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
  );
}

export function useTimersContext() {
  const timersCtx = useContext(TimersContext);

  if (timersCtx === null) {
    throw new Error(
      'You have used the TimersContext outside of the TimersContext provider'
    );
  }

  return timersCtx;
}

export default TimersContextProvider;
