import _ from 'lodash';
import { NextRequest } from 'next/server';

export enum ELogLevel {
  Fatal = 'fatal',
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Debug = 'debug',
  Exit = 'exit',
}

export interface ILogBaseProps {
  error?: unknown;
  data?: object;
}

// A log object
export interface ILogProps extends ILogBaseProps {
  level: ELogLevel;
}

// Log output format
export interface ILogOutput {
  time: string; // ISO timestamp
  level: string; // the severity level of the message
  message: string; // the log message
  error?: string; // the error message if any
  stack?: string; // a stack dump if error is specified
  data?: object; // data if specified
}

// A simple logging class
class Log {
  outputHandler: (arg: ILogOutput) => void;

  constructor() {
    this.outputHandler = this.consoleWriter;
  }

  // just a standard json output 1 message per line
  consoleWriter = (output: ILogOutput) => {
    console.log(JSON.stringify(output));
  };

  private log = (message: string, props: ILogProps) => {
    if (
      props.level === ELogLevel.Debug &&
      process.env.NODE_ENV === 'production'
    )
      return;

    const output: ILogOutput = {
      time: new Date().toISOString(),
      level: props.level,
      message: message,
    };

    if (props.error instanceof Error) {
      // if error has a message attach it
      if (props.error.message) {
        output['error'] = props.error.message;
      } else {
        output['error'] = _.toString(props.error);
      }

      // if error has a stack trace then attach it
      if (props.error.stack) {
        output['stack'] = props.error.stack;
      }
    }

    // if data is specified then attach to output
    if (props.data) {
      output['data'] = props.data;
    }

    this.consoleWriter(output);
  };

  fatal = (message: string, props?: ILogBaseProps) => {
    this.log(message, {
      level: ELogLevel.Fatal,
      ...props,
    });

    // forcefully exit the program
    process.exit(5);
  };

  exit = (message: string, props?: ILogBaseProps) => {
    this.log(message, {
      level: ELogLevel.Exit,
      ...props,
    });

    // forcefully exit the program
    process.exit(0);
  };

  error = (message: string, props?: ILogBaseProps) => {
    this.log(message, {
      level: ELogLevel.Error,
      ...props,
    });
  };

  requestError = (message: string, request: NextRequest, error: unknown) => {
    this.error(message, {
      error,
      data: {
        url: request.url,
        method: request.method,
      },
    });
  };

  warn = (message: string, props?: ILogBaseProps) => {
    this.log(message, {
      level: ELogLevel.Warn,
      ...props,
    });
  };

  info = (message: string, props?: ILogBaseProps) => {
    this.log(message, {
      level: ELogLevel.Info,
      ...props,
    });
  };

  debug = (message: string, props?: ILogBaseProps) => {
    this.log(message, {
      level: ELogLevel.Debug,
      ...props,
    });
  };
}

const log = new Log();

export default log;
