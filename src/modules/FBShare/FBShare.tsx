import React, { memo, FC, useEffect, useCallback, useMemo } from 'react';

interface FBShareProps {
  fbAppId: string;
  photos?: string[];
  link?: string;
  className?: string;
  children?: React.ReactNode;
  onComplete?(): void;
  onCancel?(): void;
}

export const FBShare: FC<FBShareProps> = memo((props) => {
  const isValidProps = useMemo(() => {
    if (!props.fbAppId) return false;
    if ((!props.photos || props.photos.length === 0) && !props.link)
      return false;

    return true;
  }, [props.fbAppId, props.photos, props.link]);

  useEffect(() => {
    if (!isValidProps) return;

    // inject FB SDK
    const scriptId = `fb-sdk-${props.fbAppId}`;
    let script = document.getElementById(scriptId);
    if (script) return;

    script = document.createElement('script');
    script.innerHTML = `
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '${props.fbAppId}',
          cookie     : true,
          xfbml      : true,
          version    : 'v10.0'
        });
          
        FB.AppEvents.logPageView();
      };
    
      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    `;

    script.setAttribute('id', scriptId);

    document.body.appendChild(script);
  }, [isValidProps, props.fbAppId]);

  const handleShare = useCallback(() => {
    if (!(window as any).FB) return;

    const options: any = { method: 'share' };

    if (props.photos && props.photos?.length > 0) options.media = props.photos;
    if (props.link) options.href = props.link;

    (window as any).FB.ui(options, function (resp: any) {
      if (resp !== undefined) {
        props.onComplete?.();
        return;
      }

      props.onCancel?.();
    });
  }, [props.link, props.photos, props.onComplete, props.onCancel]);

  if (!isValidProps)
    return <span>Cannot render Facebook Share. FB AppId is required</span>;

  return (
    <button className={props.className} onClick={handleShare}>
      {props.children}
    </button>
  );
});

FBShare.defaultProps = {
  children: 'Post to Facebook',
};
