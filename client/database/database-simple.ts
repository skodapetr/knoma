import {Database} from "./database-api";
import {
  Document,
  DocumentWithData,
  Predicate,
  PredicateEditType,
} from "./model";
import {
  createEmptyTemplate,
  createQuickNoteTemplate,
} from "./template";
import {
  getCoreCodelistItem,
  getCoreLabel,
  getCorePredicate,
  DOCUMENT_TEMPLATE,
} from "./predefined";

const RDFS_PROPERTY =
  "http://www.w3.org/2000/01/rdf-schema#Property";

const RDFS_HAS_DOMAIN =
  "http://www.w3.org/2000/01/rdf-schema#domain";

const RDFS_HAS_IN_SCHEME =
  "http://www.w3.org/2004/02/skos/core#inScheme";

const LIST_COLOR =
  "https://skodapetr.github.io/knoma/vocabulary#listColor";

const LIST_PRIORITY =
  "https://skodapetr.github.io/knoma/vocabulary#listPriority";

/**
 * Base class for a simple database. Use document list fetched from server.
 */
export abstract class SimpleDatabase implements Database {

  protected documents: Document[] = [];

  abstract getDatabaseLabel(): string;

  async getDocuments(): Promise<Document[]> {
    await this.refreshDocuments();
    return this.documents;
  }

  /**
   * Update documents from server if needed.
   */
  protected abstract refreshDocuments(): Promise<void>;

  async getTemplateDocuments(): Promise<DocumentWithData[]> {
    await this.refreshDocuments();
    const userDocuments = await Promise.all(this.documents
      .filter(isTemplateDocument)
      .map(item => this.getDocument(item.iri)));
    return [
      createEmptyTemplate(),
      createQuickNoteTemplate(),
      ...userDocuments as any,
    ];
  }

  abstract getDocument(iri: string): Promise<DocumentWithData | undefined>;

  async getPredicates(): Promise<Predicate[]> {
    await this.refreshDocuments();
    const result = [...getCorePredicate()];
    for (const document of this.documents) {
      if (document.types.includes(RDFS_PROPERTY)) {
        result.push(documentToPredicate(document));
      }
    }
    return result;
  }

  async getPredicate(iri: string): Promise<Predicate | undefined> {
    const predicates = await this.getPredicates();
    for (const predicate of predicates) {
      if (predicate.iri === iri) {
        return predicate;
      }
    }
    return undefined;
  }

  async getCodelist(types: string[]): Promise<string[]> {
    await this.refreshDocuments();
    const result: Set<string> = new Set();
    // Add core items.
    for (const type of types) {
      for (const item of getCoreCodelistItem(type)) {
        result.add(item);
      }
    }
    // Add documents of required type.
    for (const document of this.documents) {
      const inSchema = document.properties[RDFS_HAS_IN_SCHEME] || [];
      // We can add items if they are of given class or are part of a codelist.
      if (isIntersecting(inSchema, types)) {
        result.add(document.iri);

      } else if (isIntersecting(document.types, types)) {
        result.add(document.iri);
      }
    }
    return [...result];
  }

  abstract storeDocument(document: DocumentWithData): Promise<void>;

  abstract deleteDocument(iri: string): Promise<void>;

  async getLabel(iri: string): Promise<string> {
    const label = getCoreLabel(iri);
    if (label !== undefined) {
      return label;
    }
    for (const document of this.documents) {
      if (document.iri === iri) {
        return document.title;
      }
    }
    return iri;
  }

}

function isIntersecting(left: string[], right: string[]): boolean {
  for (const leftItem of left) {
    if (right.includes(leftItem)) {
      return true;
    }
  }
  return false;
}

function documentToPredicate(document: Document): Predicate {
  const codelist = document.properties[RDFS_HAS_DOMAIN];
  const listColour = document.properties[LIST_COLOR];
  const listPriority = document.properties[LIST_PRIORITY];
  return {
    "iri": document.iri,
    "label": document.title,
    "multiple": true,
    "type": codelist === undefined ?
      PredicateEditType.String : PredicateEditType.Codelist,
    "codelist": codelist || [],
    "domain": undefined,
    "listColour": listColour?.[0],
    "listPriority": parseInt(listPriority?.[0] ?? "0"),
  };
}

function isTemplateDocument(document: Document) {
  return document.types.includes(DOCUMENT_TEMPLATE);
}