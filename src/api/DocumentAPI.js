const SERVER_URL = "https://kdt-frontend.programmers.co.kr";

export class DocumentAPI {
    #username;

    constructor(username) {
        this.#username = username;
    }

    async list() {
        const response = await this.#request("/documents");

        if (!response.ok) {
            throw new Error("루트 문서 목록을 조회하는데 실패했습니다.");
        }

        return response.json();
    }

    async content(id) {
        const response = await this.#request(`/documents/${id}`);

        if (!response.ok) {
            throw new Error("개별 문서를 조회하는데 실패했습니다.");
        }

        return response.json();
    }

    async create(parentDocumentId = null) {
        const response = await this.#request("/documents", "POST", {
            title: "",
            content: "<div>default text</div>",
            parent: parentDocumentId,
        });

        if (!response.ok) {
            throw new Error("신규 문서를 생성하는데 실패했습니다.");
        }

        return response.json();
    }

    async update(id, title, content) {
        const response = await this.#request(`/documents/${id}`, "PUT", {
            title,
            content,
        });

        if (!response.ok) {
            throw new Error("기존 문서를 수정하는데 실패했습니다.");
        }

        return response.json();
    }

    async delete(id) {
        const response = await this.#request(`/documents/${id}`, "DELETE");

        if (!response.ok) {
            throw new Error("기존 문서를 삭제하는데 실패했습니다.");
        }

        return response.json();
    }

    #request(url, method, body) {
        return fetch(`${SERVER_URL}${url}`, {
            headers: {
                "x-username": this.#username,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body) ?? undefined,
            method: method ?? "GET",
        });
    }
}
