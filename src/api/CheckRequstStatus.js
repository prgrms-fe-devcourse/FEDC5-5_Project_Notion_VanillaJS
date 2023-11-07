import { push } from "../router/router.js";

export default function CheckRequestStatus(res) {
  const status = res.status;
  const statusText = res.statusText;
  if (status === 400) {
    push("/");
    throw new Error(
      `${status} : ${statusText} 😭 \n요청의 문법이 잘못되었습니다. 홈 화면으로 이동합니다.`
    );
  }
  if (status === 401) {
    push("/");
    throw new Error(
      `${status} : ${statusText} 😭 \n요청에 대한 리소스 액세스 권한이 없습니다. 홈 화면으로 이동합니다.`
    );
  }
  if (status === 402) {
    push("/");
    throw new Error(
      `${status} : ${statusText} 😭 \n요청에 대한 리소스 액세스 권한이 없습니다. 홈 화면으로 이동합니다.`
    );
  }
  if (status === 404) {
    push("/");
    throw new Error(
      `${status} : ${statusText} 😭 \n요청한 페이지를 찾을 수 없습니다. 홈 화면으로 이동합니다.`
    );
  }
  if (status === 405) {
    push("/");
    throw new Error(
      `${status} : ${statusText} 😭 \n요청이 허용되지 않은 HTTP Method를 사용했습니다. 홈 화면으로 이동합니다.`
    );
  }
  if (status === 408) {
    push("/");
    throw new Error(
      `${status} : ${statusText} 😭 \n요청을 응답하는 시간이 너무 많이 소요됩니다. 잠시 후 다시 시도해주세요. 홈 화면으로 이동합니다.`
    );
  }
  if (status === 409) {
    push("/");
    throw new Error(
      `${status} : ${statusText} 😭 \n요청의 충돌이 발생했습니다. 홈 화면으로 이동합니다.`
    );
  }
  if (status === 429) {
    throw new Error(
      `${status} : ${statusText} 😭 \n너무 많은 요청이 감지되었습니다. 잠시 후 다시 시도해주세요.`
    );
  }
  if (status === 429) {
    throw new Error(
      `${status} : ${statusText} 😭 \n너무 많은 요청이 감지되었습니다. 잠시 후 다시 시도해주세요.`
    );
  }
  if (status === 500) {
    throw new Error(
      `${status} : ${statusText} 😭 \n서버에 오류가 발생했습니다. 관리자에게 문의해주세요.`
    );
  }
  if (status === 501) {
    throw new Error(
      `${status} : ${statusText} 😭 \n서버의 응답이 없습니다. 관리자에게 문의해주세요.`
    );
  }
  if (status === 502) {
    throw new Error(
      `${status} : ${statusText} 😭 \n사용자가 너무 많습니다. 잠시 후 다시 시도해주세요.`
    );
  }
  if (status === 503) {
    throw new Error(
      `${status} : ${statusText} 😭 \n서버가 요청을 처리할 준비가 되지 않았습니다. 시스템 점검 중일 수 있습니다. 관리자에게 문의해주세요.`
    );
  }
}
