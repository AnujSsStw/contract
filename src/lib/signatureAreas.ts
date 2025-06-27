export interface SignatureArea {
  id: string;
  label: string;
  pageNumber: number;
  type: "signature" | "text" | "date";
  paryani: {
    x: number;
    y: number;
    width: number;
    height: number;
    fontSize?: number;
  };
  client: {
    x: number;
    y: number;
    width: number;
    height: number;
    fontSize?: number;
  };
}

export const SIGNATURE_AREAS: SignatureArea[] = [
  {
    id: "paryani-signature",
    label: "Paryani Signature",
    pageNumber: 22,
    type: "signature",
    paryani: {
      x: 97.1,
      y: 539.5304347826087,
      width: 137.7,
      height: 45.9,
    },
    client: {
      x: 90.215,
      y: 378.0695652173913,
      width: 137.7,
      height: 45.9,
    },
  },
  {
    id: "paryani-by",
    label: "Paryani - By",
    pageNumber: 22,
    type: "text",
    paryani: {
      x: 70,
      y: 644.6970434782609,
      width: 50,
      height: 20,
      fontSize: 15.3,
    },
    client: {
      x: 70,
      y: 484.29704347826095,
      width: 50,
      height: 20,
      fontSize: 15.3,
    },
  },
  {
    id: "paryani-title",
    label: "Paryani - Title",
    pageNumber: 22,
    type: "text",
    paryani: {
      x: 82,
      y: 615.9144347826086,
      width: 100,
      height: 20,
      fontSize: 15.3,
    },
    client: {
      x: 82,
      y: 454,
      width: 100,
      height: 20,
      fontSize: 15.3,
    },
  },
  {
    id: "paryani-witness",
    label: "Paryani - Witness",
    pageNumber: 22,
    type: "text",
    paryani: {
      x: 100,
      y: 586.8361739130435,
      width: 80,
      height: 20,
      fontSize: 15.3,
    },
    client: {
      x: 100,
      y: 425,
      width: 80,
      height: 20,
      fontSize: 15.3,
    },
  },
  //   {
  //     id: "date",
  //     label: "Date",
  //     pageNumber: 22,
  //     type: "date",
  //     paryani: {
  //       x: 150,
  //       y: 500,
  //       width: 100,
  //       height: 30,
  //       fontSize: 12,
  //     },
  //     client: {
  //       x: 150,
  //       y: 350,
  //       width: 100,
  //       height: 30,
  //       fontSize: 12,
  //     },
  //   },
];

export function getSignatureAreaCoordinates(
  areaId: string,
  isParyani: boolean,
): {
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize?: number;
} | null {
  const area = SIGNATURE_AREAS.find((a) => a.id === areaId);
  if (!area) return null;

  return isParyani ? area.paryani : area.client;
}

export function getSignatureAreasByPage(pageNumber: number): SignatureArea[] {
  return SIGNATURE_AREAS.filter((area) => area.pageNumber === pageNumber);
}
