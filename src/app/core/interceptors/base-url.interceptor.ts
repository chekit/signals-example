import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export const baseUrlInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const clone = req.clone({
    url: `https://dummyjson.com${req.url}`,
  });

  return next(clone);
};
