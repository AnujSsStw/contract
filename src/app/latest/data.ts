// both -> paragraph and list (list will be in extra)
// list -> list
// paragraph -> paragraph

export const bigData = [
  {
    id: 1,
    title: "SCOPE OF WORK",
    sections: [
      {
        id: 1,
        title: "SUBCONTRACTOR'S WORK.",
        type: "paragraph",
        description: `Contractor employs Subcontractor as an independent contractor, to
provide all labor, materials, equipment and services necessary or incidental to complete the work as more
fully described in Attachment "A" (hereinafter "Special Stipulations") and Attachment "B" (hereinafter "Scope
of Work") which are portions of the entire work (hereinafter "Work") required of Contractor by the
Owner/Contractor Agreement. The "Work" comprises the completed construction required by the
Contract Documents.`,
      },
      {
        id: 2,
        title: "SUBCONTRACT DOCUMENTS.",
        type: "both",
        description: `The term Subcontract Documents shall mean this Agreement and its
Attachments, the documents listed in Attachment C, and all documents referenced in any of them, all of which
form and are a part of this Agreement. The Subcontract Documents are binding on Subcontractor and may be
modified only by Subcontract Change Order. The term "Contract Documents" shall mean the Contract
Documents identified in the Owner/Contractor Agreement. Terms defined in the Contract Documents shall
have the same definition when used in this Agreement, unless the context clearly requires otherwise.
Contractor shall furnish Subcontractor a copy of the Owner/Contractor Agreement upon written request,
although certain confidential information may be deleted. The following Attachments are a part of the
Subcontract Documents:`,
        extra: [
          {
            id: 1,
            type: "list",
            description: `Attachment A Special Stipulations
Attachment B Scope of Work
Attachment C Drawing List/Specifications
Attachment D Schedule
Attachment E Insurance Requirements and Form of Insurance Certificate
Attachment F Lien Waiver Forms
Attachment G Payment and Performance Bond Forms
Attachment H Immigration and Security Affidavit
Attachment I Construction Rules & Regs`,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "SCHEDULE OF WORK",
    sections: [
      {
        id: 1,
        title: "TIME OF PERFORMANCE.",
        type: "paragraph",
        description: `Subcontractor shall perform all work in accordance with the time schedule set forth in Attachment D (hereinafter "Schedule") which is a part of the Subcontract Documents. The Schedule is a part of this Agreement and may be modified only by Subcontract Change Order.Time is of the essence in the performance of Subcontractor's Work.
Subcontractor agrees to perform Subcontractor's Work so that the Work and every portion thereof may be
completed in accordance with the Subcontract Documents. Subcontractor shall begin Subcontractor's Work
as soon as instructed by Contractor. Subcontractor shall prosecute Subcontractor's Work expeditiously and
at such times and in such order as Contractor shall direct to keep it sufficiently in advance of the other parts
of the Work and so as to avoid any delay or disruption to the overall progress or completion of the Work.`,
      },
      {
        id: 2,
        title: "SCHEDULE OF WORK.",
        type: "paragraph",
        description: `Contractor may prepare a construction schedule for the Work or any portion thereof. Such schedule (hereinafter "Schedule of Work") shall be generally consistent with the schedule requirements, time limitations, and other milestones for performance of the Work which are specified in the Subcontract Documents. Subcontractor shall promptly provide all scheduling information requested by Contractor for Subcontractor's Work. The Schedule of Work, which may be supplemented by near term and detailed sub schedules, may be updated, supplemented, or revised at appropriate intervals by Contractor as required by the progress of the Work and/or any changes or modifications in the requirements of the Subcontract Documents. Subcontractor shall cooperate and participate with Contractor in preparing, updating, supplementing and revising the Schedule of Work. Such Schedule of Work shall be available for review by Subcontractor. Subcontractor shall monitor progress of the Work and shall conform Subcontractor's Work, including scheduling of activities and their duration, sequences of operation and performance, and delivery of equipment and materials, to the requirements of the Subcontract Documents and the Schedule of Work. Should Contractor not prepare a Schedule of Work or should such Schedule of Work not indicate time of performance of all or part of Subcontractor's Work, then to that extent Subcontractor shall schedule and perform Subcontractor's Work consistent with Paragraph 2.1.`,
      },
      {
        id: 3,
        title: "CONDUCT OF WORK.",
        type: "paragraph",
        description: `Contractor shall have the right to decide all matters relative to the timely and orderly conduct of the Work. If requested by Contractor, Subcontractor shall furnish additional shifts of labor, work overtime, pay premium costs for materials and for expediting delivery, and make other accommodations to meet the requirements of the Schedule of Work. Should Subcontractor claim that Contractor's request constitutes an unreasonable directive and entitles Subcontractor to an adjustment to the Subcontract Price, Subcontractor shall, nevertheless, proceed as requested by Contractor and shall, promptly give written notice of claim as provided in Article 4 hereof.`,
      },
    ],
  },

  {
    id: 3,
    title: "SUBCONTRACT PRICE AND PAYMENT",
    sections: [
      {
        id: 1,
        title: "SUBCONTRACT PRICE.",
        type: "paragraph",
        description: `Contractor agrees to pay to Subcontractor for the satisfactory performance of Subcontractor's Work the "Subcontract Price" stated above, pursuant to the terms contained in this Agreement.`,
      },
      {
        id: 2,
        title: "GENERAL PAYMENT PROVISIONS.",
        type: "list",
        extra: [
          {
            id: 1,
            type: "paragraph",
            title: "SCHEDULE OF VALUES.",
            description: `No later than ten (10) days prior to the first application  for progress payment hereunder but, in any event no later than ten (10) days from the date of execution of this Agreement, whichever is earlier, Subcontractor shall submit to Contractor in such detail and with sufficient supporting information as Contractor may require, a schedule of values for all aspects  of Subcontractor's Work, accurately reflecting Subcontractor's anticipated cost of performing each work activity and aggregating the total Subcontract Price. This schedule, when approved by Contractor, shall be used as the basis for progress payment(s) to Subcontractor, unless it is subsequently found to be materially in error in which case it shall be appropriately adjusted.`,
          },
          {
            id: 2,
            type: "paragraph",
            title: "PARTIAL LIEN WAIVERS, AFFIDAVITS, AND OTHER DOCUMENTS.",
            description: `As a condition precedent to each progress payment, Subcontractor shall provide, in a form satisfactory to Owner and Contractor, partial waivers of lien or claim and affidavits of payment from Subcontractor and, if required by Contractor, from Subcontractor's lower-tier subcontractors and suppliers. Subcontractor shall, as often as required by Contractor, provide an affidavit identifying all parties who have furnished or will furnish labor, materials, and services to Subcontractor in the performance of

Subcontractor's Work, including their address, telephone and facsimile numbers, and the amount due or to become due to each. Subcontractor shall submit all documentation required for any and all LEED or other green building certification required by applicable law or the Subcontract Documents prior to any progress payment or final payment as direct by Contractor.`,
          },
          {
            id: 3,
            type: "paragraph",
            title: "PAYMENT NOT ACCEPTANCE.",
            description: `Subcontractor agrees that payment to Subcontractor does not constitute or imply acceptance of any portion of Subcontractor's Work.`,
          },
          {
            id: 4,
            type: "paragraph",
            title: "PAYMENT USE RESTRICTION.",
            description: `No payment received by Subcontractor pursuant to this Agreement shall be used to satisfy or secure any other indebtedness owed by Subcontractor until and unless all payment obligations of Subcontractor incurred in the performance of Subcontractor's Work have been satisfied. Subcontractor shall not assign any moneys due under this Agreement without the written consent of Contractor. All payments made by Contractor to Subcontractor under this Subcontract for labor, materials, or equipment furnished to the Project by any lower-tier subcontractor, supplier, or other person ("payees") at the request of or pursuant to an agreement with Subcontractor shall, to the extent of the sums owing to any payees on account of such labor or materials, be held in trust by Subcontractor for the sole and exclusive benefit of such payees pending payment by Subcontractor to such payees, and shall not be commingled with any other funds of Subcontractor, and shall be paid over to such payees timely in accordance with this Agreement. Contractor shall have the right to contact Subcontractor's lower-tier subcontractors and suppliers to assure that they are being paid.`,
          },
          {
            id: 5,
            type: "paragraph",
            title: "SUBCONTRACTOR PAYMENT FAILURE.",
            description: `If Contractor believes that payment obligations incurred by Subcontractor in the performance of Subcontractor's Work are not being satisfied, Contractor shall give Subcontractor notice thereof. If Subcontractor contends that such payment obligations are not due, Subcontractor shall notify Contractor in writing within five (5) days of Contractor's notice. Contractor may thereafter take any steps deemed necessary to assure that payments made under this Agreement are used to satisfy such obligations, including but not limited to paying such obligations directly, bonding off or otherwise discharging claims or liens arising therefrom, and retaining out of any payments due or to become due to Subcontractor (under this Agreement or otherwise) a reasonable amount to protect Contractor and Owner from any resulting loss, damage or expense.`,
          },
          {
            id: 6,
            type: "paragraph",
            title: "CONDITION PRECEDENT.",
            description: `Subcontractor acknowledges and recognizes that Subcontractor's Work is a portion of the Work and payment for Subcontractor's Work by Contractor is conditioned upon payment for Subcontractor's Work by Owner. Subcontractor warrants and represents that it relies for payment of Subcontractor's Work on the credit and ability to pay of Owner, and not of Contractor, and that Subcontractor undertakes the risk that it shall not be paid for Subcontractor's Work performed under this Agreement in the event Contractor is not paid by Owner for such work. Except for confidential information, Subcontractor may review any information provided by Owner to Contractor relative to Owner's financial ability to pay for the Work. Notwithstanding any contrary provision of the Subcontract Documents, Subcontractor expressly acknowledges and agrees that receipt by Contractor of payment from Owner for Subcontractor's Work shall be a condition precedent to any payment obligation of Contractor (or its surety) to Subcontractor under this Agreement, unless the Owner has withheld monies which would otherwise be due to Subcontractor from Contractor for reasons which are without the fault of Subcontractor and wholly the fault of Contractor or others for whom Contractor is responsible, provided, however, that this Sub- paragraph 3.2.6 shall not void any right of Subcontractor to file a claim of lien or claim against bond and take necessary legal action to preserve said claim of lien or claim against bond. Furthermore, Subcontractor agrees that it will not, under any circumstance, claim against Contractor or its surety for payment of amounts not due to Subcontractor under this Agreement.`,
          },
          {
            id: 7,
            type: "paragraph",
            title: "CONFLICTING PAYMENT PROVISIONS.",
            description: `In the event of any conflicting payment provisions of the Subcontract Documents, the payment provisions of this Agreement shall govern.`,
          },
          {
            id: 8,
            type: "list",
            title: "PROGRESS PAYMENTS.",
            extra: [
              {
                id: 1,
                type: "paragraph",
                title: "APPLICATION.",
                description: `Subcontractor may submit application for progress payment for Subcontractor's Work performed and in place on a monthly basis. Applications shall cover Work performed in the previous 30-day period and shall be submitted no later than the 25th day of the month. Application for progress payment shall be made in such form and content as required by Contractor and the Subcontract Documents and shall certify percentages of completion in accordance with the approved schedule of values established in accordance with Sub-paragraph 3.2.1. If Subcontractor's application for progress payment is not properly completed and timely submitted, Contractor shall have no obligation to include same in Contractor's application for progress payment to Owner. Portions of Subcontractor's application for progress payment resulting from Subcontract Change Orders and Subcontract Construction Change Directives shall be separately and clearly itemized. To the extent that Subcontractor's application for progress payment satisfies Owner's and Contractor's requirements, Contractor will include the same or its substance in Contractor's application for progress payment to Owner.`,
              },
              {
                id: 2,
                type: "paragraph",
                title: "RETAINAGE.",
                description: `All progress payments shall be subject to 10% retainage.  Subject to Sub-paragraph 3.2.6, retainage shall be released with final payment, if released by Owner. Contractor may, at its sole and absolute discretion, reduce retainage at any time. Contractor may also reinstate retainage at any time at its sole and absolute discretion.`,
              },

              {
                id: 3,
                type: "paragraph",
                title: "STORED MATERIALS.",
                description: `If allowed by the Subcontract Documents, and if approved in advance by Owner or Contractor, Subcontractor's applications for progress payment may include amounts for materials and equipment not yet incorporated in Subcontractor's Work, but delivered, adequately protected, and suitably stored at the site or at any other location allowed by the Subcontract Documents. Approval shall be conditioned upon submission by Subcontractor of such documents and procedures as are required by the Subcontract Documents and are satisfactory to establish Owner's or Contractor's unencumbered title to such materials and equipment and otherwise protect their interests. Unless otherwise agreed in writing between Contractor and Subcontractor, Subcontractor shall pay all costs associated with offsite storage, including costs incurred by Contractor and Owner in making reasonable inspections.`,
              },
              {
                id: 4,
                type: "paragraph",
                title: "CONDITIONS OF PAYMENT.",
                description: `Subject to Sub-paragraph 3.2.6, Contractor shall within twenty (20) days, or such other time if required by law, after receipt by Contractor from Owner of monies in payment of Subcontractor's application for progress payment pay same over to Subcontractor, less retainage pursuant to the terms of this Agreement. Notwithstanding any contrary provision in this Agreement, Contractor may delay payment of all or any portion of Subcontractor's application for progress payment because of: (1) unsatisfactory progress of Subcontractor's Work; (2) defective or non-conforming Subcontractor's Work which has not been remedied; (3) Subcontractor's Work which is in dispute; (4) third party claims filed or reasonable evidence indicating probable filing of such claims; (5) reasonable basis for concluding that Subcontractor has failed to satisfy its payment obligations; (6) damage caused by Subcontractor to Owner, Contractor, or other contractors or subcontractors, (7) reasonable evidence that Subcontractor's Work cannot be completed for the unpaid balance of the Subcontract Price, or within the time allowed by the Schedule of Work; (8) Subcontractor's persistent failure to carry out Subcontractor's Work in accordance with the  Subcontract Documents; (9) Subcontractor's submission of inaccurate or incorrect applications for progress payment, affidavits, and waivers; (10) failure by Subcontractor to furnish Contractor daily reports as required in Paragraph 5.5. No such action by Contractor shall relieve Subcontractor from its obligations under this Agreement or estop Contractor from subsequently asserting Subcontractor's failure to satisfy said obligations.`,
              },
            ],
          },
        ],
      },
      {
        id: 3,
        title: "FINAL PAYMENT.",
        type: "list",
        extra: [
          {
            id: 1,
            type: "paragraph",
            title: "APPLICATION.",
            description: `Upon completion of Subcontractor's Work and acceptance by Owner, Contractor, and any other party whose acceptance is required under the Subcontract Documents, and upon Subcontractor furnishing evidence of fulfillment of all of Subcontractor's obligations in accordance with the Subcontract Documents, Subcontractor may submit application for final payment to Contractor and Contractor shall forward same to Owner.`,
          },
          {
            id: 2,
            type: "paragraph",
            title: "REQUIREMENTS.",
            description: `Before Contractor shall be required to forward Subcontractor's application for final payment to Owner, Subcontractor shall submit to Contractor: (1) an affidavit that all payrolls, bills for materials, services, equipment and taxes, and all other payment obligations connected with Subcontractor's Work for which the Owner or its property or Contractor or Contractor's surety might in any way be liable, have been paid or to the extent allowed by the Subcontract Documents will be paid or otherwise satisfied out of such final payment; (2) consent of surety to final payment, if required; (3) all required maintenance manuals, operating instructions, as-built drawings, inspection and test results, and similar items; (4) any and all other data/documents such as guarantees, warranties, LEED or other green building documentation, receipts, releases, and waivers of liens to the extent and in such form as may be required by Contractor, Owner or  Subcontract Documents.`,
          },
          {
            id: 3,
            type: "paragraph",
            title: "CONDITIONS OF FINAL PAYMENT.",
            description: `Subject to Sub-paragraph 3.2.6, final payment of the balance of the Subcontract Price due shall be made to Subcontractor when appropriate certification and final approval thereof have been received as provided in the Subcontract Documents. Subcontractor's acceptance of final payment shall constitute a waiver by Subcontractor of all claims relating to Subcontractor's Work except such claims as have been previously identified and presented to Contractor in writing and preserved and pursued pursuant to Sub-paragraphs 4.2.2 and 4.2.4.`,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "CHANGES, FIELD ORDERS, CLAIMS AND DELAYS",
    sections: [
      {
        id: 1,
        title: "CHANGES.",
        type: "both",
        description: `Contractor may, without invalidating this Agreement or any bond given hereunder, direct Subcontractor in writing to make changes in Subcontractor's Work which are within the general scope of this Agreement. Subcontractor shall submit written proposals for such changes pursuant to the requirements of the Subcontract Documents and any additional requirements of Contractor within such time as to enable Contractor to give Owner any notices required by the Contract Documents, or within three (3) days of Contractor's directive, whichever is earlier. Subcontractor's failure to submit its proposal as required herein, shall constitute a waiver of all rights to any adjustment to the Subcontract Price or Schedule of Work, or, where a credit is involved, shall constitute acceptance of the deductive amount determined by Contractor. Adjustments to the Subcontract Price or Schedule of Work, if any, resulting from such changes shall be set forth in a Subcontract Change Order or Subcontract Construction Change Directive. No adjustment to the Subcontract Price or Schedule of Work shall be made for any changes for which a Subcontractor Change Order or Subcontract Construction Change Directive have not been issued in writing by Contractor. Subcontractor shall only be entitled to an adjustment to the Subcontract Price or Schedule of Work in connection with any change initiated by Owner upon the same terms and conditions such adjustment is allowable to Contractor by Owner under the Contract Documents and subject to Sub- paragraph 3.2.6.`,
        extra: [
          {
            id: 1,
            type: "paragraph",
            title: "SUBCONTRACT CHANGE ORDER.",
            description: `A "Subcontract Change Order" is a written order prepared by the Contractor and signed by the Contractor and Subcontractor stating agreement upon a change in the scope of Subcontractor's Work and, where appropriate, an adjustment in the Subcontract Price and/or Schedule of Work.`,
          },
          {
            id: 2,
            type: "paragraph",
            title: "SUBCONTRACT CONSTRUCTION CHANGE DIRECTIVE.",
            description: `(A) A "Subcontract Construction Change Directive" is a written order prepared and signed by Contractor directing a change in Subcontractor's Work and stating a proposed adjustment, if any, in the Subcontract Price and/or Schedule of Work. A Subcontract Construction Change Directive shall be used in the absence of agreement on all the terms of a Subcontract Change Order.

(B) If Subcontractor agrees with the terms of the Subcontract Construction Change Directive, Subcontractor shall sign and return it immediately to Contractor. The Subcontract Construction Change Directive shall be in effect as a performance obligation of Subcontractor and shall be incorporated in a Subcontract Change Order by Contractor. If Subcontractor disagrees with the Subcontract Construction Change Directive, Subcontractor shall, within seven (7) days notify Contractor in writing of the reasons therefor and comply with Sub-paragraph 4.1.5. In either case, Subcontractor shall promptly comply with all Subcontract Construction Change Directives.`,
          },
          {
            id: 3,
            type: "paragraph",
            title: "SUBCONTRACT FIELD ORDERS.",
            description: `A "Subcontract Field Order" is a written order prepared and signed by Contractor directing minor or incidental changes to or clarifying the scope of Subcontractor's Work, which does not involve an adjustment to the Subcontract Price or Schedule of Work. Subcontractor shall promptly comply with all Subcontract Field Orders. If Subcontractor believes a Subcontract Field Order justifies an adjustment to the Subcontract Price or Schedule of Work, Subcontractor shall within seven (7) days notify Contractor in writing, of the reason therefor. If Contractor agrees, a Subcontract Change Order will be issued. If Contractor disagrees, a Subcontract Construction Change Directive will be issued.`,
          },
          {
            id: 4,
            type: "paragraph",
            title: "ADJUSTMENT IN SUBCONTRACT PRICE.",
            description: `Any adjustment in the Subcontract Price shall be established by one of the following methods: (1) mutual agreement on a lump sum with sufficient information to substantiate the amount; (2) unit prices stated in the Subcontract Documents or if not stated then established by mutual agreement; (3) where directed by Contractor, on a time and material basis plus a markup of 5% for overhead and profit; or (4) as may otherwise be required by the Subcontract Documents.`,
          },
          {
            id: 5,
            type: "paragraph",
            title: "SUBSTANTIATION OF ADJUSTMENT.",
            description: `In the event Contractor and Subcontractor cannot agree on the entitlement to and/or the amount of adjustment in the Subcontract Price, Subcontractor shall present to Contractor, on a daily basis, cost records (including detailed description and location of work performed) of such work on a time and material basis. Failure to do so shall be a waiver of any claim by Subcontractor for adjustment to the Subcontract Price or Schedule of Work. The signature of a Contractor's representative on such work tickets only acknowledges receipt and does not constitute acceptance of the accuracy or content of such work tickets or entitlement to a change in Subcontract Price or the Schedule of Work. Pending final determination of costs, Subcontractor may include in Subcontractor Applications for Payment to Contractor amounts not in dispute for work performed pursuant to properly authorized Subcontract Construction Change Directives.`,
          },
        ],
      },
      {
        id: 2,
        title: "CLAIMS.",
        type: "list",
        extra: [
          {
            id: 1,
            type: "paragraph",
            title: "CLAIM.",
            description: `A claim is a demand or assertion made in writing by Contractor or Subcontractor seeking an adjustment in the Subcontract Price and/or Schedule of Work, an adjustment or interpretation of the terms of this Agreement, or other relief arising under or relating to this Agreement, including the resolution of any matters in dispute between Contractor and Subcontractor in connection with Subcontractor's Work.`,
          },
          {
            id: 2,
            type: "paragraph",
            title: "CLAIMS RELATING TO OWNER.",
            description: `Subcontractor agrees to make all claims against Contractor for which the Owner is or may be liable in the same manner and within the time limits provided in the Contract Documents for like claims by Contractor against Owner. Notice of such claims shall be given by Subcontractor to Contractor at the earlier of: (1) within such time as to enable Contractor to give Owner any notices required by the Contract Documents; (2) within seven (7) days of the occurrence of the event for which such claim is made; or (3) prior to performance of the affected portion of Subcontractor's Work; otherwise, such claim shall be deemed waived. Subcontractor shall only be entitled to an adjustment to the Subcontract Price or Schedule of Work for performing and completing that portion of Subcontractor's Work associated with any claim for which Owner is or may be liable, subject to Sub-paragraph 3.2.6, and to the extent actually granted to Contractor by Owner. Any decision of the Owner or Architect with respect to such claims which, under the terms of the Contract Documents, is binding on Contractor, and any decision in arbitration or litigation between the Owner and Contractor which becomes final and binding on Contractor shall likewise be final and binding on Subcontractor. To the extent Contractor prosecutes or defends a claim on behalf of Subcontractor, Subcontractor agrees to: (a) cooperate fully with Contractor; (b) furnish all documents, statements, witnesses and other information required by Contractor; and (c) reimburse Contractor for all related expenses and costs, including reasonable attorneys' fees.`,
          },
          {
            id: 3,
            type: "paragraph",
            title: "CLAIMS RELATING TO CONTRACTOR.",
            description: `Notice of any claim not covered by Sub-paragraph 4.2.2 shall be given by Subcontractor to Contractor at the earlier of: (1) within seven (7) days after the occurrence of the event for which such claim is made; or (2) prior to performance of the affected portion of Subcontractor's Work; otherwise, such claim shall be deemed waived.`,
          },
          {
            id: 4,
            type: "paragraph",
            title: "CLAIMS RELATING TO OTHER SUBCONTRACTORS OR SUPPLIERS.",
            description: `Contractor shall not be liable to Subcontractor for any adjustments to the Subcontract Price, Schedule of Work, damages, costs, losses or expenses, including but not limited to attorney's fees, resulting from acts or omissions (whether or not negligent), failure to perform, delays in performance, or defaults of any other subcontractor or any supplier in connection with the performance of any of the Work. Subcontractor agrees to file any claim for such directly against the other subcontractor or supplier which Subcontractor contends is responsible, without making Owner or Contractor a party to any such claim or action. Subcontractor agrees that other subcontractors or suppliers on the Project shall have a direct right of action against Subcontractor for such claims. To the extent that Subcontractor is or may be liable for any claims asserted by other subcontractors or third parties against the Contractor in an arbitration proceeding, then, at the election of the Contractor, Subcontractor hereby consents to joinder in such arbitration proceeding and to the direct assertion of claims by such subcontractor or third party against Subcontractor.`,
          },
        ],
      },
      {
        id: 3,
        title: "DELAY.",
        type: "list",
        extra: [
          {
            id: 1,
            type: "paragraph",
            description: `If the progress of Subcontractor's Work is substantially delayed without the fault or responsibility of Subcontractor, then the Schedule of Work shall be adjusted accordingly, but only to the extent an extension of time is obtained for same by Contractor from Owner under the terms of the Contract Documents. Subcontractor must give written notice of delay to Contractor within such time as to enable Contractor to give Owner any notices required by the Contract Documents, but in any event, no later than seven (7) days after the occurrence of the event claimed to be a substantial delay, otherwise the right to such an adjustment to the Schedule of Work is waived. The Subcontractor's sole and exclusive remedy for any and all impact, delay, disruption, hindrance, interference, inefficiencies, damages or any other adverse effects to the performance of Subcontractor's Work shall be by adjustment to the Schedule of Work, as provided above, except to the extent that Contractor receives payment for same from Owner under the terms of the Contract Documents.`,
          },
          {
            id: 2,
            type: "paragraph",
            title: "DELAY DAMAGES.",
            description: `If delay damages are assessed against Contractor, then Contractor may assess same against Subcontractor in proportion to Subcontractor's share of responsibility. Subcontractor shall also be liable for all additional damages Contractor may incur as a result of Subcontractor's failure to complete Subcontractor's Work or any portion thereof in accordance with Article 2.`,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "SUBCONTRACTOR'S OBLIGATIONS",
    sections: [
      {
        id: 1,
        title: "OBLIGATIONS DERIVATIVE",
        type: "paragraph",
        description: `Subcontractor binds itself to Contractor under this Agreement in the same manner as Contractor is bound to the Owner under the Contract Documents. If substantially similar types of provisions are contained in both the Owner/Contractor Agreement and this Agreement, then the provision that imposes the greater level of responsibility on Subcontractor shall govern.`,
      },
      {
        id: 2,
        title: "RESPONSIBILITIES",
        type: "paragraph",
        description: `Subcontractor shall furnish and pay for all the labor, materials and equipment, including but not limited to competent supervision and project management, shop drawings, samples, mock-ups, tools, scaffolding, temporary facilities and services necessary for the proper performance of Subcontractor's Work. Subcontractor shall, at the completion of Subcontractor's Work or when directed by Contractor, remove from the Project all temporary facilities and services furnished by Subcontractor and repair or restore areas affected by said removal.`,
      },
      {
        id: 3,
        title: "COORDINATION AND COOPERATION",
        type: "paragraph",
        description: `Subcontractor shall: (1) promptly submit shop drawings, data, and samples, and prepare mock-ups required by the Subcontract Documents or Contractor in order to carry on Subcontractor's Work efficiently and at a speed that will avoid delay to the Schedule of Work, and permit coordination of Subcontractor's Work with the work of Contractor and others; (2) prepare coordination drawings as required by the Subcontract Documents or, at Contractor's election, shall participate in the preparation of coordination drawings in order to properly coordinate interrelated and interfacing work. Should Subcontractor install any portion of Subcontractor's Work prior to coordination or in such a manner as to cause interference with the work of Contractor or others, Subcontractor shall, at its own expense, arrange for its removal or modification, and all related cutting and patching; (3) be responsible for taking all field measurements necessary to ensure the proper fitting of Subcontractor's Work with the work of Contractor and others. Field measurements shall be taken and coordinated in a timely manner to avoid delaying the Schedule of Work; (4) schedule delivery of all materials and equipment consistent with installation dates required by the Schedule of Work. Subcontractor shall promptly notify Contractor, in writing, of any change in the delivery status of any of Subcontractor's materials or equipment; however, any such change shall not relieve Subcontractor of its obligations to perform its Work in accordance with this Agreement; (5) before proceeding with any portion of Subcontractor's Work, review all job conditions and thoroughly inspect all prior work of Contractor and others. Subcontractor shall notify Contractor, in writing, of any unacceptable conditions, interferences, or defective prior work that would affect the proper and timely execution of Subcontractor's Work. Unless such notice is given, Subcontractor shall be deemed to have fully accepted the conditions as they exist and shall be fully responsible for any and all resulting expenses, losses or damages; (6) coordinate Subcontractor's Work with, and cooperate with, Contractor and all others whose work may interface or interfere with Subcontractor's Work. Subcontractor recognizes that Subcontractor's Work may not always be performed as a continuous operation.`,
      },
      {
        id: 4,
        title: "SUBCONTRACTOR'S REPRESENTATIVE(S)",
        type: "paragraph",
        description: `Subcontractor shall designate one or more persons acceptable to Contractor who shall be Subcontractor's representative(s) on site and off site. Said representative(s) shall have full responsibility for the prosecution of Subcontractor's Work, and full authority to act on behalf of Subcontractor in all matters necessary for proper supervision, coordination, scheduling, direction and technical administration of Subcontractor's Work. Such representative(s) shall attend meetings, at such times and places as shall be determined by Contractor, to report on the progress of Subcontractor's Work. Subcontractor shall replace any representative Contractor reasonably determines to be unacceptable.`,
      },
      {
        id: 5,
        title: "INSPECTION AND PROGRESS REPORTS",
        type: "paragraph",
        description: `Subcontractor shall notify Contractor, in writing, when portions of Subcontractor's Work are ready for inspection. Subcontractor shall, at all times, furnish Contractor, Owner and their representatives safe and adequate facilities for inspecting Subcontractor's Work and materials at the Project, or at any place where Subcontractor's Work or materials may be located. Subcontractor shall furnish to Contractor, on forms available from Contractor and in such detail as Contractor requires, daily reports of the progress of Subcontractor's Work, including work performed off-site. Daily reports shall be delivered to Contractor no later than the end of the subsequent working day. Neither inspections of Subcontractor's Work nor Contractor's receipt of Subcontractor's daily reports shall relieve Subcontractor from any obligations arising under this Agreement.`,
      },
      {
        id: 6,
        title: "STORAGE AND PROTECTION OF MATERIALS AND EQUIPMENT",
        type: "paragraph",
        description: `Subcontractor shall receive, unload, handle, store, inspect and install all materials and equipment furnished and used in the performance of Subcontractor's Work and shall be responsible for assuring that all such materials and equipment satisfy the requirements of this Agreement. In the event Contractor accepts delivery of materials or equipment on behalf of Subcontractor, Contractor shall not assume any responsibility or liability thereby, and Subcontractor agrees to reimburse Contractor for all costs incurred in accepting delivery. Subcontractor shall be responsible for storage of all materials and equipment to be installed under this Agreement, in such locations and in such manner as are approved by Contractor and which cause no unsafe conditions or interference with the Work. Should any of Subcontractor's facilities, services, materials or equipment obstruct the progress of any portion of the Work or create unsafe or hazardous conditions in the opinion of Contractor, they shall be moved by Subcontractor, as directed by Contractor. Deliveries shall be scheduled and coordinated with Contractor so that materials are not stored on the site any longer than necessary prior to incorporation into Subcontractor's Work.`,
      },
      {
        id: 7,
        title: "PROTECTION OF THE WORK",
        type: "paragraph",
        description: `Subcontractor shall reasonably protect Subcontractor's Work and any other existing Work or improvements from damage. Should Subcontractor cause damage to the Work or to property of the Owner, Contractor or others, Subcontractor shall promptly remedy such damage to the satisfaction of Contractor, Owner or others, or Contractor may remedy such damage on Subcontractor's behalf.`,
      },
      {
        id: 8,
        title: "SAFETY AND CLEANUP",
        type: "list",
        extra: [
          {
            id: 1,
            title: "SUBCONTRACTOR COMPLIANCE",
            type: "paragraph",
            description: `Subcontractor, its agents, employees, suppliers and lower-tier subcontractors, shall comply with Contractor's safety policy and all applicable federal, state and local safety rules, standards, regulations and record-keeping requirements. Subcontractor shall continuously inspect Subcontractor's Work to assure compliance. Subcontractor shall directly receive, respond to, defend, and be solely responsible for all citations, assessments, fines or penalties which may be received or incurred by reason of its failure or failure on the part of its agents, employees, suppliers or subcontractors to so comply, and further shall indemnify, defend, and hold harmless Contractor pursuant to Paragraph 8.1 from and against any such claims, damages, loss, cost or expense, including attorneys' fees, relating thereto.`,
          },
          {
            id: 2,
            type: "paragraph",
            description: `Subcontractor shall follow Contractor's safety and cleanup requirements and shall at all times: (1) require its employees to wear hardhats and all other required safety clothing and personal protective equipment at all times while on the Project; (2) keep the Project, including each work area, free from trash, debris and unsafe conditions resulting from Subcontractor's Work and perform trash and debris removal as required by Contractor; (3) keep materials, supplies, tools and equipment stored in a neat and orderly manner; (4) be responsible for the safe handling and installation of its materials and equipment so as to provide for the safety of persons and property, the work of others, and materials and equipment stored at the Project or elsewhere; and (5) immediately repair or replace, at its own expense, any barricade, railing, cover or safety device removed, altered or rendered ineffective by Subcontractor.`,
          },
          {
            id: 3,
            type: "paragraph",
            description: `Subcontractor shall provide Contractor with an inventory of all materials Subcontractor has or will have on site that are regulated under OSHA Standard 1926.59. In addition, Subcontractor shall provide Contractor with a Material Safety Data Sheet (MSDS) on all materials listed on its inventory. Subcontractor shall, at all times, have such MSDS available for emergency reference. Subcontractor shall secure same from any lower-tier subcontractors and provide them to Contractor.`,
          },
          {
            id: 4,
            type: "paragraph",
            description: `Subcontractor shall advise Contractor, in writing, of the facts and details of every accident and personal injury related to Subcontractor's Work and simultaneously furnish to Contractor a copy of every accident report furnished to Subcontractor's insurance carrier.`,
          },
          {
            id: 5,
            type: "paragraph",
            description: `Subcontractor shall have a written policy prohibiting its employees, subcontractors or agents (hereinafter referred to as "person(s)") who enter the Project, Contractor's property or other workplace from: (1) using, possessing, selling, purchasing, distributing or transporting illegal drugs, controlled substances, and unauthorized alcohol or intoxicants on the Project, Contractor's property or other workplace; and (2) being at work with measurable levels of illegal drugs, controlled substances, alcohol or intoxicants present in the body which may affect the person's ability to work safely and efficiently. Subcontractor agrees to require any person involved in an accident or other incident on the Project, Contractor's property or other workplace, which results in or could have resulted in personal injury or property damage, to submit to a drug and/or alcohol test conducted by a NIDA-approved laboratory at Subcontractor's expense. Subcontractor agrees to have the tests conducted within two (2) hours of the Contractor's request or the incident, and to promptly provide the results of such test(s) to Contractor or to immediately remove any person refusing to submit to a test or search from the Project, Contractor's property or other workplace.`,
          },
          {
            id: 6,
            type: "paragraph",
            description: `If Subcontractor fails to comply with such safety duties, or fails to commence clean-up duties within twenty-four (24) hours after receipt from Contractor of notice of noncompliance, or immediately in the event of an emergency, Contractor may implement such safety or cleanup measures as Contractor deems necessary or prudent without further notice to Subcontractor.`,
          },
        ],
      },
      {
        id: 9,
        title: "ENVIRONMENTAL PROTECTION",
        type: "paragraph",
        description: `Subcontractor shall be responsible for compliance with all applicable federal, state, and local natural resource and environmental protection requirements, codes and regulations. In addition, Subcontractor shall: (1) not provide nor allow any of its lower-tier subcontractors or suppliers to provide any products or materials to the Project that are considered hazardous wastes or substances by controlling federal, state, and local agencies, rules or regulations. Upon notice from Owner, Architect or Contractor, Subcontractor shall remove any such products or materials provided in violation of this paragraph, at its sole responsibility and expense; (2) notify Contractor, in writing, of any such products or materials if they are included in the specifications, or if they are encountered on the Project.`,
      },
      {
        id: 10,
        title: "PERMITS, FEES, LICENSES AND TAXES",
        type: "paragraph",
        description: `Subcontractor shall give required notices to any governmental authorities and shall secure and pay for all applicable permits, fees, tests, licenses, assessments, inspections and taxes related to Subcontractor's work.`,
      },
      {
        id: 11,
        title: "SUBCONTRACTING AND ASSIGNMENT",
        type: "paragraph",
        description: `This Agreement shall not be subcontracted or assigned, nor shall any of the payments hereunder be assigned, without the prior written consent of Contractor. Any assignment without such prior written consent shall vest no rights in the assignee against Contractor. Subcontractor shall provide a list of its proposed subcontractors (if subcontracting is permitted by Contractor) and material and equipment suppliers for review by Contractor. Subcontractor shall incorporate all provisions of this Agreement which affect the rights of Contractor into any subcontracts and purchase order agreements it proposes to execute with any other party. Any assignment, subcontract, transfer or partial disposition of this Agreement permitted by Contractor shall not relieve Subcontractor of its obligation to fully perform this Agreement, and Subcontractor shall remain liable to Contractor for all acts and omissions of its subcontractors, suppliers and assigns.`,
      },
      {
        id: 12,
        title: "LAYOUT RESPONSIBILITY",
        type: "paragraph",
        description: `Prior to commencing any portion of Subcontractor's Work, Subcontractor shall verify drawing dimensions and actual field conditions which affect its work and immediately notify Contractor of any errors, inconsistencies or omissions it may discover. Contractor will establish only principal control lines and benchmarks for the Work. Subcontractor shall be responsible to accurately layout Subcontractor's Work. Subcontractor shall be responsible for any loss or damage to Contractor or others due to Subcontractor's failure to notify Contractor of any error, inconsistency or omission it may discover, or to accurately layout or properly perform Subcontractor's Work. Should Subcontractor disturb or destroy any controls, survey lines, or layout performed by Contractor or others, Subcontractor shall reimburse the affected party for the costs of restoring same.`,
      },
      {
        id: 13,
        title: "WORKMANSHIP",
        type: "paragraph",
        description: `Every portion of Subcontractor's Work shall be executed in accordance with the Subcontract Documents, in a good and workmanlike manner, of sound quality, and in accordance with all applicable laws, regulations and codes. All materials used in Subcontractor's Work shall be new unless expressly provided otherwise in the Subcontract Documents. Subcontractor shall, within three (3) days after written notice from Contractor, proceed promptly to correct and/or remove from the Project site all work and/or materials which Contractor, Architect or Owner condemn or fail to approve, and shall promptly make good all such work and other work damaged or destroyed in correcting or removing such work.`,
      },
      {
        id: 14,
        title: "MATERIALS FURNISHED BY OTHERS",
        type: "paragraph",
        description: `If Subcontractor's Work includes installation of materials or equipment furnished by others, Subcontractor shall examine the items so provided and receive, unload, handle, store and install said items with such skill and care as to ensure proper installation. Subcontractor shall be responsible for any and all loss or damage resulting from Subcontractor's failure to notify Contractor, prior to installation, of any shortage, damage or defect in materials and equipment furnished by others.`,
      },
      {
        id: 15,
        title: "SUBSTITUTIONS AND ALTERNATES",
        type: "paragraph",
        description: `No substitution, alternate, or other deviation (“deviation”) shall be allowed in Subcontractor's Work unless Subcontractor first receives approval for such deviation as required by the Subcontract Documents. If Subcontractor obtains approval of any deviation, Subcontractor shall be responsible for all resulting additional costs incurred by Contractor or others. Subcontractor's shop drawings and other submittals shall clearly identify any deviation from the requirements of the Subcontract Documents. Contractor's review of Subcontractor's shop drawings and other submittals is general only and shall not relieve Subcontractor from responsibility for any unapproved deviation from the requirements of the Subcontract Documents.`,
      },
      {
        id: 16,
        title: "USE OF CONTRACTOR'S EQUIPMENT",
        type: "paragraph",
        description: `Subcontractor, its agents, employees, subcontractors or suppliers shall not use Contractor's labor, and shall not use or operate Contractor's machinery, equipment, tools, scaffolding, hoists, lifts or similar items (“equipment”) owned, leased, or under the control of Contractor without the express written permission of Contractor's designated main office project manager. If such use is permitted by Contractor, Subcontractor shall assume all risk in connection therewith, including the risk of defects in said equipment.`,
      },
      {
        id: 17,
        title: "EXCLUSIVE RELATIONSHIP",
        type: "paragraph",
        description: `Until final completion of the Project, Subcontractor agrees not to: (1) perform any work directly for Owner, its tenants or any other contractors or subcontractors on the Project; and (2) communicate directly with Owner's representatives, including but not limited to the Architect, in connection with the Project, unless authorized in advance in writing by Contractor. All of Subcontractor's communications with the Owner or Architect in relation thereto, shall be through Contractor. In the event Subcontractor performs any work in violation of this provision, it agrees to make no claims against Contractor in connection therewith.`,
      },
      {
        id: 18,
        title: "SUBCONTRACT BOND AND FINANCIAL INFORMATION",
        type: "paragraph",
        description: `If required by Contractor, Subcontractor shall, upon execution and delivery of this Agreement, deliver to Contractor separate performance and payment bonds, each in the full amount of the Subcontract Price on forms acceptable to Contractor. Such bonds shall provide for the faithful performance of this Agreement, including but not limited to: (1) changes or modifications thereto (irrespective of consent of surety); (2) all warranty and guarantee obligations thereunder; and (3) the payment of all labor, services, tools and equipment (including rental thereon), materials and supplies. Premiums on said bonds are to be paid by Subcontractor. Additional premiums applicable to any Subcontract Change Orders are to be paid by Subcontractor. Surety on such bonds shall be bound, jointly and severally, by any determination or decision which is binding on Subcontractor and shall, on demand, pay to Contractor any sums for which Subcontractor may be liable to Contractor. At Contractor's option, Subcontractor's surety may be joined as a party in any arbitration with Subcontractor pursuant to this Agreement. The provisions of this Agreement are hereby incorporated into the bonds by reference, and in the event of conflict, this Agreement shall govern. If Subcontractor fails to timely furnish said bonds, Contractor may terminate this Agreement with seven (7) days written notice and Contractor shall only be obligated to pay Subcontractor for work already performed and expense incurred pursuant to Paragraph 10.4. When bonds are not required, Contractor nonetheless reserves the right at any time prior to Subcontractor's first Application for Progress Payment or commencement of Subcontractor's Work at the Project site, whichever occurs later, to require Subcontractor to furnish such bonds at Contractor's expense. No payment shall be due Subcontractor, pursuant to this Agreement, unless and until any required bonds have been provided. Subcontractor shall, if required by Contractor, submit current financial and work in progress statements in a form acceptable to Contractor.`,
      },
      {
        id: 19,
        title: "WARRANTY AND RECORD STORAGE",
        type: "paragraph",
        description: `Subcontractor warrants Subcontractor's Work against all deficiencies and defects in materials and/or workmanship for the warranty period called for in the Contract Documents, or longer if required by applicable law. If no specific warranty period is required by the Contract Documents or applicable law, Subcontractor warrants Subcontractor's Work for a period of one (1) year. Warranty shall commence to run at such time as required by the Contract Documents or, in the absence of such requirement, when Substantial Completion of the Project has been certified in accordance with the Contract Documents. Use of equipment or occupancy of a portion or portions of the Work prior to substantial completion of the Project shall not alter the commencement or duration of the warranty period unless otherwise provided in the Contract Documents. Subcontractor agrees to satisfy all warranty obligations which occur within the warranty period without cost to Owner or Contractor. In the event Subcontractor fails to do so within fourteen (14) days after Contractor's written notice, Contractor may proceed at Subcontractor's expense to make good any such deficiency or defect.`,
      },
      {
        id: 20,
        title: "HOISTING",
        type: "paragraph",
        description: `Hoisting shall be as provided in Attachment A.`,
      },
      {
        id: 21,
        title: "LIENS.",
        type: "paragraph",
        description: `Subcontractor shall, at all times, keep the Project free from liens of workers, subcontractors,
suppliers or others claiming under or through Subcontractor for labor, services, material or equipment
(including rental thereon) claimed to have been furnished for or used in Subcontractor’s Work. Within three
(3) days after receipt of written demand from Contractor, Subcontractor shall immediately pay, bond off, or
otherwise discharge such liens and furnish proof of same to Contractor. Upon Subcontractor’s failure to do
so, Contractor may take any action it deems appropriate to discharge such lien on Subcontractor’s behalf.
Subcontractor shall indemnify, defend
and hold harmless Contractor and Owner from all claims, damages, losses, costs and expenses, including
reasonable attorneys’ fees, resulting from any such liens.`,
      },
    ],
  },
  {
    id: 6,
    title: "RECOURSE BY CONTRACTOR",
    sections: [
      {
        id: 1,
        title: "FAILURE OF PERFORMANCE",
        type: "list",
        extra: [
          {
            id: 1,
            title: "DEFAULT",
            type: "paragraph",
            description: `If, in the opinion of the Contractor, Subcontractor fails to supply enough properly skilled workers, supply enough proper materials, equipment, or facilities, maintain the Schedule of Work, or make prompt payment of its obligations hereunder, or comply with laws, ordinances, rules, regulations or orders of any public authority having jurisdiction, or otherwise is in material breach of this Agreement, and does not, within three (3) days after receipt of written notice, commence and diligently continue to satisfactorily correct such failure or material breach, then Contractor, without prejudice to any other rights or remedies, shall have the right to either or both of the following remedies: (1) supply such number of workers and quantity of materials, equipment and other facilities, or contract with others, as Contractor deems necessary, for the completion of Subcontractor's Work, or any part thereof, which Subcontractor has failed to complete or perform after such notice; (2) withhold payment of any monies otherwise due Subcontractor pending satisfactory corrective action by Subcontractor; and (3) take any other action Contractor deems reasonably necessary to remedy such default.`,
          },
          {
            id: 2,
            title: "TERMINATION BY CONTRACTOR",
            type: "paragraph",
            description: `Should Subcontractor fail to comply with Sub-paragraph 6.1.1, Contractor may, within three (3) days after receipt of a second written notice to promptly commence and diligently continue to satisfactorily correct a default, terminate Subcontractor's performance under this Agreement. Should Contractor elect to terminate Subcontractor's performance as provided herein, Contractor shall give written notice of such termination to Subcontractor and its surety.`,
          },
          {
            id: 3,
            title: "RIGHTS IN SUBCONTRACTOR’S EQUIPMENT",
            type: "paragraph",
            description: `
            Should Subcontractor fail to comply with Sub-
paragraph 6.1.1 or 6.1.2, Contractor may, without any expense to itself or liability to Subcontractor, take over
and use all materials, tools, appliances and equipment furnished by, belonging or delivered to Subcontractor
at the Project and located offsite which are intended for the performance of Subcontractor’s Work. Upon
completion and acceptance of Subcontractor’s Work, any materials, tools, appliances and equipment not
consumed by Contractor in the completion thereof shall be returned to Subcontractor to the extent there is
no residual and unsatisfied liability from Subcontractor to Contractor.
            `,
          },
        ],
      },
      {
        id: 2,
        title: "BANKRUPTCY - INTERIM REMEDIES",
        type: "paragraph",
        description: `
If a petition in bankruptcy is filed by or against Subcontractor
pursuant to the U. S. Bankruptcy Code, or any similar state statute or code, and at the time of such filing or at
any subsequent time Subcontractor is not performing in accordance with the terms of this Agreement,
Contractor may, while awaiting the decision of Subcontractor or its trustee or the Court to reject this
Agreement, or to affirm this Agreement and provide adequate assurance of
Subcontractor’s ability to perform hereunder, avail itself of such remedies under this Article 6 as Contractor
deems necessary to perform Subcontractor’s Work.
        `,
      },
      {
        id: 3,
        title: "SUSPENSION OR TERMINATION BY OWNER",
        type: "paragraph",
        description: `Should Owner suspend or terminate the Contract between Owner and Contractor, or any portion of said Contract which includes all or part of Subcontractor's Work, Contractor shall so notify Subcontractor in writing. Upon receipt of said notice, Subcontractor's performance under this Agreement, or affected portion thereof, shall also be suspended or terminated and Subcontractor shall immediately stop work on any affected portion of Subcontractor's Work. In the event of Owner suspension or termination, Contractor's liability to Subcontractor is limited to the extent of recovery by Contractor from the Owner, on Subcontractor's behalf, for such suspension or termination, and is subject to Sub-paragraph 3.2.6.`,
      },
      {
        id: 4,
        title: "TERMINATION FOR CONVENIENCE",
        type: "paragraph",
        description: `Contractor may, for its convenience, issue a written order to Subcontractor terminating all or any part of Subcontractor's Work. Within five (5) days after receipt of Contractor's order, Subcontractor shall notify Contractor in writing of the effect of such order. The Subcontract Price and/or Schedule of Work shall thereafter be equitably adjusted by Subcontract Change Order. Subcontractor shall not be entitled to recover cost incurred due to its failure to terminate performance upon receipt of Contractor's order. Neither the Subcontract Price nor the Schedule of Work shall be adjusted under this paragraph for any termination to the extent that performance would have been terminated due to the fault or negligence of Subcontractor. In the event of termination, Contractor's liability to Subcontractor shall be subject to Sub-paragraph 3.2.6 and limited to the reasonable value of, or payments due for, performance prior to termination of Subcontractor's Work (or affected portion thereof), whichever is less, plus reasonable overhead and profit thereon, plus reasonable costs resulting directly from the termination (such as cancellation charges), less prior payments made pursuant to this Agreement. Subcontractor shall not be entitled to recover overhead or prospective profit on the value of any of Subcontractor's Work not performed.`,
      },
      {
        id: 5,
        title: "WRONGFUL EXERCISE",
        type: "paragraph",
        description: `If Contractor wrongfully exercises any option or remedy under this Article 6, Contractor's liability to Subcontractor shall be no greater than and subject to the same limitations provided in Paragraph 6.4 hereof.`,
      },
    ],
  },
  {
    id: 7,
    title: "LABOR RELATIONS",
    sections: [
      {
        id: 1,
        title: "LABOR WARRANTY",
        type: "paragraph",
        description: `Subcontractor warrants that it shall manage its employees and shall utilize
workers and means in such a manner that Subcontractor’s Work shall be performed in strict accordance with
this Agreement and so as not to interfere with the Work of Contractor or others.`,
      },
      {
        id: 2,
        title: "EQUAL OPPORTUNITY EMPLOYMENT",
        type: "paragraph",
        description: `Contractor is an Equal Opportunity Employer. Subcontractor
warrants that it will comply with all applicable federal, state and local fair employment laws, ordinances, rules
and/or regulations.`,
      },
      {
        id: 3,
        title: "INDEPENDENT EMPLOYER",
        type: "paragraph",
        description: `Subcontractor is a separate independent employer and shall be solely
responsible for the supervision, direction and control of its employees. Contractor will only give instructions
or orders to persons designated as authorized representatives of Subcontractor and not to workers or
employees of Subcontractor. Subcontractor, in its sole discretion, shall establish its labor relations policies
and conditions of employment for its workforce consistent with the requirements of Paragraph 7.1. All labor
grievances of, and disciplinary actions to be taken against Subcontractor’s employees shall be handled
exclusively by Subcontractor`,
      },
    ],
  },

  {
    id: 8,
    title: "INDEMNIFICATION AND INSURANCE",
    sections: [
      {
        id: 1,
        title: "SUBCONTRACTOR’S PERFORMANCE",
        type: "paragraph",
        description: `To the fullest extent permitted by law, Subcontractor shall
indemnify, defend and hold harmless Owner, Architect, Contractor and all of their affiliates, parents,
subsidiaries, officers, directors, employees, successors and assigns (all of which are hereinafter collectively
referred to as “Indemnitees”), from and against all claims, damages, losses, costs and expenses, including but
not limited to attorneys’ fees, arising out of or resulting from the performance of Subcontractor’s Work,
provided that any such claim, damage, loss, cost or expense, including attorneys’ fees: (1) is attributable to
bodily injury, sickness, disease, or death, or to injury to or destruction of tangible property (other than direct
damage to Subcontractor’s Work itself), including the loss of use resulting therefrom, and is caused or alleged
to be caused in whole or in any part by any act or omission of Subcontractor or anyone directly or indirectly
employed by Subcontractor or anyone for whose acts Subcontractor may be liable, regardless of whether it
is also caused in part by a party indemnified hereunder; or (2) arises out of or relates to Subcontractor’s performance under this Agreement, or results from any claimed failure of Subcontractor to properly fulfill its
obligations under this Agreement. This indemnity obligation shall not be construed to negate, or abridge, or
otherwise reduce any other right or obligation of indemnity which would otherwise exist under law except to
the extent that it is caused by the sole negligence of any party indemnified hereunder in which case this
obligation shall not apply relative to such indemnified party.
`,
      },
      {
        id: 2,
        title: "NO LIMITATION UPON LIABILITY",
        type: "paragraph",
        description: `In any and all claims against Indemnitees by any employee of
Subcontractor, anyone directly or indirectly employed by Subcontractor, or anyone for whose acts
Subcontractor may be liable, the indemnification obligations under this Article 8 shall not be limited in any
way by any limitation on the amount or type of damages, compensation, or benefits payable by or for
Subcontractor under workers’ compensation acts, disability benefit acts, or other employee benefit acts.
`,
      },
      {
        id: 3,
        title: "COMPLIANCE WITH LAWS",
        type: "paragraph",
        description: `Subcontractor is bound by, and, at its own cost, shall comply with all
applicable federal, state and local codes, laws, ordinances and regulations (herein “laws”), including but not
limited to laws pertaining to equal employment opportunity, social security, unemployment compensation,
workers’ compensation, tax, safety, and building codes. Subcontractor shall indemnify, defend and hold
harmless Indemnitees with respect to all claims, damages, losses, costs and expenses attributable to the
failure or claimed failure of Subcontractor, or its employees, agents, subcontractors or suppliers, to comply
with such laws, including but not limited to any fines or penalties incurred by Contractor or Owner in
connection therewith.
`,
      },
      {
        id: 4,
        title: "PATENTS",
        type: "paragraph",
        description: `Except as otherwise provided by the Contract Documents, Subcontractor shall pay and be
responsible for all royalties and license fees which may be due because of any patented materials or
processes used or included in Subcontractor’s Work. Subcontractor shall indemnify, defend and hold harmless
Contractor and Owner (and Architect only to the extent required by the Contract Documents) from all suits
or claims for infringement of any patent rights arising out of Subcontractor’s Work.
`,
      },
      {
        id: 5,
        title: "CONSIDERATION",
        type: "paragraph",
        description: `Included in the Subcontract Price is the sum of one hundred dollars ($100.00) as
specific consideration for the indemnity obligations provided under this Article 8.
`,
      },
      {
        id: 6,
        title: "SUBCONTRACTOR’S INSURANCE",
        type: "paragraph",
        description: `Subcontractor’s insurance shall conform to the requirements of Attachment F.`,
      },
    ],
  },
  {
    id: 9,
    title: "DISPUTE RESOLUTION",
    sections: [
      {
        id: 1,
        title: "AGREEMENT TO MEDIATE AND ARBITRATE",
        type: "paragraph",
        description: `All claims, disputes and other matters in question arising
out of or relating to this Agreement or the performance or breach thereof, except for claims which have been
waived by the acceptance of final payment, claims which are subject to a final and binding determination
under Sub-paragraph 4.2.2, shall be initially subject to mediation under the American Arbitration Association’s
`,
      },
      {
        id: 2,
        title: "NOTICE OF DEMAND",
        type: "paragraph",
        description: `Demand for arbitration shall be filed in writing with the other party to this Agreement. Demand for arbitration shall be made within a reasonable time after the claim, dispute or other matter in question arises, but in no event shall it be made after the date when institution of legal or equitable proceedings based on such claim, dispute or other matter in question would be barred by the applicable statute of limitation.`,
      },
      {
        id: 3,
        title: "AWARD",
        type: "paragraph",
        description: `The arbitration award shall be final and judgment may be entered upon it in accordance with applicable law in any court having jurisdiction.`,
      },
      {
        id: 4,
        title: "WORK CONTINUATION",
        type: "paragraph",
        description: `Unless otherwise agreed in writing, Subcontractor shall carry on Subcontractor’s Work and maintain the Schedule of Work during or pending any mediation or arbitration, and conversely, Contractor shall continue to perform its obligations under this Agreement.`,
      },
      {
        id: 5,
        title: "NO LIMITATION OF RIGHTS OR REMEDIES",
        type: "paragraph",
        description: `Nothing in this Article 9 shall limit any rights or remedies, not otherwise expressly waived by Subcontractor, which Subcontractor may have under lien laws or payment bonds; provided, that mediation or arbitration under this Article 9 is a condition precedent to any such right of Subcontractor to institute an action in any court against Contractor or its surety or the Owner, and if such action is instituted, Subcontractor agrees that it shall be stayed pending arbitration, unless Contractor elects to have such matters decided by litigation.`,
      },
      {
        id: 6,
        title: "SAME ARBITRATORS",
        type: "paragraph",
        description: `To the extent not prohibited by their contracts with other parties, the claims and disputes of Owner, Contractor, Subcontractor and others involving a common question of fact or law shall, at Contractor’s option, be heard by the same arbitrator(s) in a single proceeding. Subcontractor agrees that it shall not object to inclusion in the arbitration of any person or entity not a party to this Agreement, by consolidation or joinder or in any other manner, if that party is substantially involved in a common question of fact or law.`,
      },
      {
        id: 7,
        title: "ARBITRABILITY",
        type: "paragraph",
        description: `In any dispute arising out of the application of this Article 9, questions of arbitrability or consolidation of proceedings shall be decided by the appropriate court and not by arbitration.`,
      },
    ],
  },
  {
    id: 10,
    title: "CONTRACT INTERPRETATION",
    sections: [
      {
        id: 1,
        title: "INCONSISTENCIES, OMISSIONS AND CONFLICTS.",
        type: "paragraph",
        description: `Subcontractor shall make a careful analysis and
comparison of the drawings, specifications, other Contract Documents, Subcontract Documents and all other
information furnished by the Owner relating to Subcontractor’s Work. Should inconsistencies, omissions or
design deficiencies appear in the Subcontract Documents, or between the Subcontract Documents and any
manufacturer’s instructions or specifications, Subcontractor shall notify Contractor, in writing, prior to proceeding with Subcontractor’s Work affected thereby or, no later than three (3) days after Subcontractor’s
discovery thereof, whichever is earlier. Subcontractor shall assume all responsibility attributable to
proceeding without such written notice, and any claims by Subcontractor for damages, losses, costs and
expenses, including but not
limited to attorneys’ fees, arising therefrom shall be deemed waived. In the event of a conflict between this
Agreement and any other Subcontract Documents, this Agreement shall govern. Contractor and
Subcontractor agree that this Agreement is deemed to have been negotiated, drafted and agreed to by the
parties in an arms’ length transaction and no inference or presumption should be drawn against either of
them with respect to the drafting of this Agreement, including but not limited to any ambiguities which may
exist herein.
 `,
      },
      {
        id: 2,
        title: "GOVERNING LAW",
        type: "paragraph",
        description: `Except to the extent provided otherwise in Paragraph 9.1, and unless precluded by their contracts with other parties, the claims and disputes of Owner, Contractor, Subcontractor and others involving a common question of fact or law shall, at Contractor’s option, be heard by the same arbitrator(s) in a single proceeding. Subcontractor agrees that it shall not object to inclusion in the arbitration of any person or entity not a party to this Agreement, by consolidation or joinder or in any other manner, if that party is substantially involved in a common question of fact or law.`,
      },
      {
        id: 3,
        title: "SEVERABILITY AND WAIVER",
        type: "paragraph",
        description: `The partial or complete invalidity of any provision(s) of this Agreement
shall not affect the validity or continuing force and effect of any other provision(s). Any course of conduct by
Contractor or failure of Contractor to insist upon the performance of any provision(s) of this Agreement, or
to exercise any right(s) herein, shall not be construed as a waiver or relinquishment by Contractor of such
provision(s) or right(s) in any other instance.`,
      },
      {
        id: 4,
        title: "COSTS INCURRED",
        type: "paragraph",
        description: `Should Contractor incur costs as a result of Subcontractor’s failure to fulfill its duties
or obligations pursuant to this Agreement, or any other contract between Contractor and Subcontractor,
Contractor shall be entitled to offset such costs (including reasonable overhead and profit and reasonable
attorneys’ fees) against any sums otherwise due or to become due to Subcontractor under this Agreement or
any other contract between Contractor and Subcontractor on this or any other project. Subcontractor shall
remain liable for, and shall promptly pay Contractor, any amount by which such costs exceed the sums
otherwise due or to become due to Subcontractor. Upon final completion and acceptance of Subcontractor’s
Work hereunder, whether completed by Subcontractor, Contractor or others at Contractor’s election,
Subcontractor shall be entitled to the lesser of: (1) the reasonable value of any work performed by
Subcontractor within the scope of this Agreement for which Subcontractor has not received payment; or (2)
any unpaid balance of the Subcontract Price after the Contractor shall have fully exercised its right of offset
as provided herein. Should Contractor be required to institute or defend a lawsuit or arbitration in order to
enforce any of the provisions of this Agreement or to protect Contractor’s interests arising hereunder, or to
collect damages for the breach of this Agreement, or to recover on a surety bond given by a party under this
`,
      },
      {
        id: 5,
        title: "EMERGENCIES",
        type: "paragraph",
        description: `In the event of an emergency which threatens the safety of persons or property, either
party may take such action as is reasonably necessary for the protection of persons or property without having
first given such prior written notice as may otherwise be required under the terms of this Agreement,
provided that such written notice shall be given as soon thereafter as is reasonably possible.`,
      },
      {
        id: 6,
        title: "DAYS",
        type: "paragraph",
        description: `Unless otherwise expressly provided, the term “days”, when used in this Agreement, shall mean calendar days.`,
      },
      {
        id: 7,
        title: "TITLES",
        type: "paragraph",
        description: `The titles given to the Articles of this Agreement are for ease of reference only and shall not be relied upon or cited for any other purpose.`,
      },
      {
        id: 8,
        title: "NOTICE",
        type: "paragraph",
        description: `Notice given under this Agreement shall be made as follows: See
Attachment A.
In the event that either party wishes to change its person or place for notice, then such information shall be
communicated immediately in writing to the other party.`,
      },
      {
        id: 9,
        title: "ENTIRE AGREEMENT",
        type: "paragraph",
        description: `This Agreement is solely for the benefit of the signatories hereto, represents the entire and integrated agreement between the parties hereto, and supersedes all prior negotiations, or agreements, either written or oral.`,
      },
      {
        id: 10,
        title: "EXTENT OF AGREEMENT",
        type: "paragraph",
        description: `Nothing in this Agreement shall be construed to create a contractual relationship between persons or entities other than the Contractor and Subcontractor.`,
      },
    ],
  },
  // TODO: The Contractor and the Subcontractor for themselves, their successors and executors bind themselves under seal to the terms of this Agreement.
  // page: 22
];

// TODO: Add heading -> These Special Stipulations as listed below are considered part of the subcontract agreement and are to be followed by all subcontractors.
export const pointsData = [
  "Subcontractor is responsible for the labor, equipment, scaffolding, layout, unloading, directing, hoisting, etc. of its tools, equipment, and materials.",
  "Subcontractor is responsible for the unloading, hoisting, etc. of its tools, equipment, and materials.",
  "Subcontractor understands that this scope of work is not continuous and that multiple mobilizations may be required.",
  "This Subcontractor shall provide its own generators for powering any tools or equipment required for the performance of his work, if utility power is not available. Paryani Construction to supply power for mixers/saws near silos. Subcontractor shall supply 100ft of cords.",
  "No onsite parking is provided. Subcontractor shall be responsible to provide offsite parking for its employees. Paryani Construction is not responsible for the reimbursement of parking violations or tickets received.",
  "Complete the Work covered under this subcontract agreement per the contract schedule as shown in Attachment D.",
  "This Subcontractor shall provide street cleaning and washing of tires of all its construction vehicles and equipment as necessary to constantly keep the surrounding roads clean and free of debris. Paryani Construction will provide a cleaning station.",
  "It is understood that every single condition, connection, transition, etc. cannot be specifically detailed in the Contract Documents. Details are provided for typical conditions and making adjustments to adapt these to the specific conditions throughout the project is a part of the scope of work of this subcontract and does not constitute a change in the scope of work.",
  "If a workday is missed due to inclement weather, holiday’s etc. Paryani Construction expects that the lost work week hours up to a full 40 hour work week will be scheduled for Saturdays at no additional cost.",
  "All material shall be disposed of legally, and the Subcontractor shall comply with requirements of local authorities regarding loading of trucks, covering of transported material, flagmen, and cleaning of adjacent public ways. Paryani Construction will provide dumpsters.",
  "Should the Subcontractor encounter any down time due to equipment failure or breakdown, the subcontractor shall have the repairs done immediately or a replacement brought in. The subcontractor will be expected to make up this down time by performing overtime work at no additional cost until the lost time is made up to the satisfaction of the project superintendent.",
  "Subcontractor will be responsible for complying with any recycling or construction waste management requirements set forth by the Contractor.",
  "Subcontractor shall wear the proper PPE at all times including a hard hat, safety vest, safety glasses, safety gloves, and hard soled boots.",
  "Subcontractor understands that multiple punch list may be issued including a General Contractor pre-punch list, Architect/Engineer punch list, and Owner’s punch list. Subcontractor shall complete any punch list items within 2 weeks of receipt. Subcontractor shall provide a dedicated crew to complete punch list items. In addition, Subcontractor shall provide any necessary personnel during building inspections for the purpose of making immediate corrections to deficient items.",
  "Subcontractor shall supply their own Site Specific Safety Manual.",
  "Subcontractor shall clean up all debris and trash caused by their own scope daily.",
  "Subcontractor shall submit all submittals within one week of receiving this.",
  "Subcontractor understands that any alternates must be approved by the Architect of Record and/or Engineer of Record. Should any alternates not be approved, the original specified material shall be provided at no additional cost.",
  "The work of this subcontract will be in accordance with all Federal, State and local codes and regulations as interpreted by the Agency or Authority having such jurisdiction.",
  "Subcontractor shall be responsible for coordinating with other trades as much as required for a complete scope.",
  "Subcontractor includes all permits, fees, and taxes associated with this scope of work.",
  "Subcontractor shall submit all closeout documents within one week of completion on this scope.",
  "All shutdowns of Owner’s operational systems shall be scheduled in advance of the work and shall be submitted to Paryani Construction’s Project Superintendent in writing (1) one month prior to the shutdown. This Subcontractor may be required to attend a coordination meeting with Paryani Construction and the Owner.",
  "This Subcontractor shall inspect those areas and/or substrates prepared for your work and notify Paryani Construction in writing of any deficiencies which may impact its work.",
  "This Subcontractor shall protect their work by any means necessary during and after installation. This includes protection from weather, theft, and construction activities and traffic.",
  "This Subcontractor shall protect finishes and materials adjacent to work supplied and installed under this Trade Contract Agreement.",
  "This Subcontractor shall final clean all items installed under this scope of work.",
  "This Subcontractor shall provide a competent full time on-site superintendent during all hours of this Subcontractor performing work.",
  "This Subcontractor shall complete a Subcontractor Daily Work Report for everyday of work. The completed Subcontractor Daily Work Report form shall be sent to the Project Superintendent at the end of each workday.",
  "Subcontractor shall furnish and install all material, tools, labor, and equipment needed to provide all mockups as listed in the contract documents. All work on mockups may be required to completed prior to full mobilization and may require a separate mobilization.",
  "Subcontractor shall be responsible for checking the Procore for changes to the Contract Documents, RFI responses, schedule updates, and other project documentation on a regular basis. Paryani Construction will also send notifications for all changes to the contract documents.",
  "Subcontractor understands that the project property will remain in use by the Owner and their clients. Extreme care must be taken during all aspects of construction to ensure the safety of all personnel and property.",
  "This property is tobacco free. No smoking or chewing of tobacco products will be allowed on site.",
  "Subcontractor will utilize just in time deliveries for this project as laydown area and staging space is very limited. Subcontractor will coordinate with superintendent and project manager",
];
