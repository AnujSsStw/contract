import Image from "next/image";
import { Subcontract } from "./types";

interface SearchParams {
  state: string;
  page: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function Latest({ searchParams }: PageProps) {
  const { state, page } = await searchParams;
  const pageNumber = parseInt(page);
  const base64Decoded = Buffer.from(state, "base64").toString();
  const decodedJson = decodeURIComponent(base64Decoded);
  const parsedState = JSON.parse(decodedJson) as Subcontract;

  return (
    <div className="flex flex-col p-4">
      {pageNumber === 1 && (
        <div className="">
          <Image
            src="/Paryani_Construction_Logo.png"
            alt="latest"
            width={300}
            height={300}
            className="mx-auto"
          />
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold underline text-center pt-4">
              SUBCONTRACT AGREEMENT
            </h1>
            <p>
              THIS SUBCONTRACT AGREEMENT (the &quot;Agreement&quot;) is made and
              entered into on {parsedState.date}, by and between
            </p>
            <div>
              <p className="font-bold">Paryani Construction</p>
              <p>5505 Interstate North Parkway</p>
              <p>Atlanta, GA 30328</p>
              <p>404-432-7820</p>
            </div>
            <p>and</p>
            <div>
              <p>
                {parsedState.subcontractor_company_name} (hereinafter
                &quot;Subcontractor&quot;)
              </p>
              <div className="flex flex-col gap-2">
                <p>{parsedState.subcontractor_address_line_1}</p>
                {parsedState.subcontractor_address_line_2 && (
                  <p>{parsedState.subcontractor_address_line_2}</p>
                )}
              </div>
              <p>{parsedState.subcontractor_phone}</p>
            </div>
            <p>to perform the work identified herein.</p>
            <div className="font-bold">SUBCONTRACT PRICE:</div>
            <p>{parsedState.contract_value}.</p>

            <div>
              <p className="font-bold">
                Project Name (the &quot;Project&quot;):{" "}
                {parsedState.project_name}
              </p>
              <p className="font-bold">
                Project Owner (the &quot;Owner&quot;):{" "}
                {parsedState.project_owner_client_legal_name}
              </p>
              <p className="font-bold">
                Project No.: {parsedState.project_number}
              </p>
              <p className="font-bold">
                Subcontract No.: {parsedState.subcontract_number}
              </p>
              <p className="font-bold">
                Architect/Engineer: {parsedState.architect_name}
              </p>
              <p className="font-bold">
                Site Location: {parsedState.project_address}
              </p>
              <p className="font-bold">Bonds: {parsedState.bond_needed}</p>
            </div>
          </div>
        </div>
      )}

      {pageNumber === 3 && (
        <div className="flex flex-col gap-7">
          <h1>
            IN WITNESS WHEREOF, the parties hereto, through their duly
            authorized representatives, have executed this Agreement and affixed
            their seals hereto on the day and year first above written.
          </h1>
          <div className="flex flex-col gap-4">
            <p>Paryani Construction</p>
            <p>By: ___________________________</p>
            <p>Title: ___________________________</p>
            <p>Witness: ___________________________</p>
            <p>Seal:</p>
          </div>
          <div className="flex flex-col gap-4">
            <p>{parsedState.subcontractor_company_name}</p>
            <p>By: ___________________________</p>
            <p>Title: ___________________________</p>
            <p>Witness: ___________________________</p>
            <p>Seal:</p>
          </div>
        </div>
      )}

      {pageNumber === 5 && (
        <div className="flex flex-col gap-4 text-justify">
          <article>
            <h1 className="text-2xl font-bold text-center">
              Other Project Information
            </h1>
            <p>
              The following contains Paryani Construction&apos;s staffing
              responsibilities, and procedures for pay applications.
              Subcontractors and vendors must follow the procedures as outlined
              herein. Any deviation from them will cause delay in or denial of
              approval for payment or change order requests. Samples of the
              required payment application forms are attached. This exhibit also
              contains job specific information to facilitate location of and
              deliveries to the job site.
            </p>
          </article>
          <article>
            <h1 className="text-2xl font-bold text-center">
              Submittal Procedure
            </h1>
            <p>
              Please make all necessary submittals according to the Contract
              Documents within two weeks of the date of the subcontract or
              vendor agreement; please email digital copies of each submittal.
              If additional time is required please supply Paryani Construction
              with a submittal schedule. Allow two weeks for submittal approval
              by Paryani Construction and the architect. Submittals should be
              sent to the attention of:
            </p>
          </article>
          <div className="ml-7">
            <p>{parsedState.project_generated_user}</p>
            <p>5505 Interstate North Parkway, Suite 100</p>
            <p>Atlanta GA</p>
            <p>30328</p>
            <p>{parsedState.project_generated_user_email}</p>
          </div>
          <article>
            <h1 className="text-2xl font-bold text-center">
              Pay Application Form
            </h1>
            <p>
              Please find attached a sample of Paryani Construction&apos;s
              mandatory Pay Application form. A signed lien waiver is required
              with each pay application. Each subcontractor must supply Paryani
              Construction with its W-9 form on its first project with Paryani
              Construction.
            </p>
          </article>
          <article>
            <h1 className=" font-bold text-center underline">
              LINK TO BILLING DOCUMENTS BELOW
            </h1>
            <a
              className="text-blue-500 underline text-center block pt-4 pb-4 font-bold text-2xl"
              href="https://paryani-my.sharepoint.com/:f:/g/personal/bhavik_paryaniconstruction_com/EuVKOkPF4rFLkiINEei4KKEBV9W9lTyXMj8Mc33x5ShZ3Q?e=zaQkNa"
              target="_blank"
              rel="noopener noreferrer"
            >
              Required Forms and Templates
            </a>
          </article>
          <article>
            <h1 className="">
              All Billings should be sent to the attention of:
            </h1>
            <div className="ml-7">
              <p>Accounting Dept.</p>
              <p>5505 Interstate North Parkway, Suite 100</p>
              <p>Atlanta GA 30328</p>
              <p>770-652-2316</p>
              <p>accounting@paryaniconstruciton.com</p>
            </div>
          </article>
          <article
            style={{
              pageBreakBefore: "always",
            }}
          >
            <h1 className="text-2xl font-bold text-center">
              Job Specific Information
            </h1>
            <p>Name: {parsedState.project_name}</p>
            <p>Project Number: {parsedState.project_number}</p>
            <p>Address: {parsedState.project_address}</p>
          </article>

          <p>
            A. The stated scope of work under this contract agreement is to
            provide the Work per Plans and Specification Division{" "}
            {parsedState.divisions.map((item) => item.description).join(", ")}.
            Your firm is required to comply with construction safety standards
            at all times. This is a schedule driven project and any delay caused
            by your firm needs to be addressed immediately through a recovery
            schedule administered by your firm and approved/coordinated by
            Paryani Construction.
          </p>
          <div className="flex flex-col gap-4">
            <ol className="list-decimal ml-7">
              {parsedState.scope_of_work?.map((item) => (
                <li key={item.type}>{item.text}</li>
              ))}
            </ol>
          </div>
          <p>B. Summary of Exclusions:</p>
          <ol className="ml-7 list-decimal">
            {parsedState.exclusion.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <p>C. Breakdown of Costs:</p>
          <ol className="ml-7 list-decimal">
            {parsedState.cost_breakdown.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <p>D. Notices to Subcontractor shall be sent to the following:</p>
          <div className="ml-7 font-bold">
            <p>Project Contact: {parsedState.subvContactName}</p>
            <p>Subcontractor Name: {parsedState.subcontractor_name}</p>
            <p>
              Subcontractor Address: {parsedState.subcontractor_address_line_1}
            </p>
            <p>Subcontractor Phone: {parsedState.subcontractor_phone}</p>
            {parsedState.subcontractor_address_line_2 && (
              <p>{parsedState.subcontractor_address_line_2}</p>
            )}
          </div>
        </div>
      )}

      {/* {pageNumber === 7 && (
        <div className="flex flex-col gap-4 text-justify">
          <h1 className="text-xl font-bold text-center">PERFORMANCE BOND</h1>
          <p className="text-right">Bond No._________</p>

          <div className="flex flex-col gap-4">
            <p>
              {parsedState.subcontractor_name}{" "}
              {parsedState.subcontractor_address_line_1 +
                "," +
                (parsedState.subcontractor_address_line_2 || "")}
              , hereinafter referred to as &quot;Principal&quot;;
            </p>
            <p>
              {parsedState.subcontractor_name}, hereinafter referred to as
              &quot;Surety&quot;, which is a company authorized to transact
              surety business in the State of Georgia;
            </p>
            <p>
              {parsedState.project_owner_client_legal_name}, hereinafter
              referred to as the &quot;Contractor&quot;;
            </p>
          </div>

          <p>
            Principal has entered into a written agreement dated [INSERT DATE OF
            CONTRACT FOR CONSTRUCTION] for construction services related to the
            project known as [INSERT FULL LEGAL NAME AND ADDRESS OF PROJECT]
            (hereinafter the &quot;Project&quot;), in accordance with the
            Construction Documents that have been or will be prepared by [INSERT
            NAME AND ADDRESS OF PROJECT ARCHITECT], which agreement is made part
            hereof by reference, and is hereinafter referred to as the
            Agreement.
          </p>

          <p>
            Principal and Surety do hereby bind themselves, their heirs,
            executors, administrators, successors, and assigns, jointly and
            severally to Contractor in the amount of [INSERT PRINCIPAL AMOUNT OF
            CONTRACT IN NUMERALS AND WORDS ($ )], for the proper and timely
            performance of the Agreement.
          </p>

          <p>
            If Principal fails to fully, properly or timely perform its
            obligations under the Agreement, the Surety shall promptly remedy
            such failure in the manner specified or approved by Contractor, at
            its sole and absolute discretion, which may include, but not be
            limited to, the engagement of a replacement contractor(s) approved
            by Contractor, payment of the cost to complete all unperformed
            obligations under the Agreement, including the cost to correct any
            defective or non- conforming Work, or by payment to Contractor of an
            amount not to exceed the penal sum of this Bond, and shall
            indemnify, defend, and hold harmless the Contractor, its officers,
            employees, members, directors, trustees, principals, partners, and
            agents, against any direct or indirect damages or claim in
            connection with or arising directly or indirectly out of
            Principal&apos;s failure to fully, properly and timely perform its
            obligations under the Agreement, including but not limited to the
            payment of any liquidated or unliquidated delay damages incurred as
            a result of Principal&apos;s failure to perform its obligations
            under the Agreement and any legal costs, including attorney&apos;s
            fees, design professional and other consulting costs resulting
            therefrom.
          </p>

          <p>
            No separate agreement, modification, or change in the Agreement,
            change in the work covered by the Agreement, or extension of time
            for the completion of the Agreement shall release Surety from its
            obligations hereunder, regardless of whether Surety has been
            provided notice thereof. Accordingly, Surety hereby waives notice of
            any change to the Agreement, including modifications to the time for
            performance, the scope of the Agreement, or other obligations under
            the Agreement.
          </p>

          <p>
            Any proceeding, legal or equitable, under this Bond shall be
            instituted in accordance with the method of dispute resolution
            specified in the Agreement within the applicable statute of
            limitation or repose, as the case may be. In the event that the
            Agreement provides for arbitration of disputes, Surety hereby
            consents to being made a party to such arbitration, whether by
            joinder, consolidation, or otherwise, and to the rules and
            procedures established therein.
          </p>
        </div>
      )}

      {pageNumber === 7 && (
        <div className={`flex flex-col gap-4 text-justify break-before-page`}>
          <div className="mt-8">
            <p className="font-bold mb-4">
              IN WITNESS WHEREOF, WE HAVE CAUSED THE INSTRUMENT TO BE EXECUTED
              AND SEALED BY OUR DULY AUTHORIZED LEGAL REPRESENTATIVES.
            </p>

            <p className="mb-8">
              Signed and sealed this _______ day of _____________, 20_____.
            </p>

            <div className="flex flex-col gap-8">
              <div>
                <p className="font-bold">
                  PRINCIPAL: [INSERT FULL LEGAL NAME OF PRINCIPAL]
                </p>
                <div className="mt-7">
                  <p>By: _________________________________</p>
                  <p className="">(Signature)</p>
                  <p className="text-center italic mt-4">
                    AFFIX CORPORATE SEAL
                  </p>
                  <p className="mt-4 mr-4">_________________________________</p>
                  <p className="">(Title)</p>
                  <div className="mt-4">
                    <p>Witnessed by: _______________________</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-bold">
                  SURETY: [INSERT FULL LEGAL NAME OF PRINCIPAL]
                </p>
                <div className="mt-7">
                  <p>By: _________________________________</p>
                  <p className="">(Signature)</p>
                  <p className="text-center italic mt-4">
                    AFFIX CORPORATE SEAL
                  </p>
                  <p className="mt-4 mr-4">_________________________________</p>
                  <p className="">(Title)</p>
                  <div className="mt-4">
                    <p>Witnessed by: _______________________</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-8">
              A Power of Attorney has been affixed hereto and is made part of
              this Performance Bond.
            </p>
          </div>
        </div>
      )}

      {pageNumber === 8 && (
        <div className="flex flex-col gap-4 text-justify">
          <h1 className="text-xl font-bold text-center">PAYMENT BOND</h1>
          <p className="text-right">Bond No._________</p>

          <div className="flex flex-col gap-4">
            <p>
              [INSERT FULL LEGAL NAME AND ADDRESS OF SUBCONTRACTOR], hereinafter
              referred to as &quot;Principal&quot;;
            </p>
            <p>
              [INSERT FULL LEGAL NAME AND ADDRESS OF SURETY], hereinafter
              referred to as &quot;Surety&quot;, which is a company authorized
              to transact surety business in the State of Georgia;
            </p>
            <p>
              [INSERT FULL LEGAL NAME AND ADDRESS OF CONTRACTOR], hereinafter
              referred to as the &quot;Contractor&quot;;
            </p>
            <p>
              Principal has entered into a written agreement dated [INSERT DATE
              OF CONTRACT] for construction services related to the project
              known as [INSERT FULL LEGAL NAME AND ADDRESS OF PROJECT], in
              accordance with the Construction Documents that have been or will
              be prepared by [INSERT NAME AND ADDRESS OF PROJECT ARCHITECT],
              which agreement is made part hereof by reference, and is
              hereinafter referred to as the Agreement.
            </p>
            <p>
              Principal and Surety do hereby bind themselves, their heirs,
              executors, administrators, successors, and assigns, jointly and
              severally to, to Contractor in the amount of [INSERT PRINCIPAL
              AMOUNT OF CONTRACT IN NUMERALS AND WORDS ($ )], to pay for labor,
              materials and equipment furnished for use in the performance of
              the Agreement.
            </p>
            <p>
              If Principal fails to pay any Claimant, as defined below, in
              accordance with their contract for all labor, services, and
              materials that such Claimant has furnished for use in the
              performance of the Agreement, or fails to discharge, bond off,
              dissolve, or otherwise cause the cancellation of any lien or claim
              of lien that any such Claimant may record against the real
              property where the Project is located, the Surety shall promptly
              make payment to such Claimant of all sums due for labor, services,
              or materials furnished by such Claimant for use in the performance
              of the Agreement, notwithstanding any applicable &quot;pay if
              paid&quot; or &quot;pay when paid&quot; provision; discharge, bond
              off, dissolve, or otherwise cause the cancellation of any such
              lien or claim of lien; and indemnify, defend, and hold harmless
              the Contractor, its officers, employees, members, principals,
              partners, trustees, directors, and agents, from and against any
              claims, demands, liens, claims of lien, or suits by such Claimant
              arising out of or relating to such labor, services, or materials
              that Claimant furnished for use in the performance of the
              Agreement, including any legal costs, attorney&apos;s fees, expert
              fees, and legal expenses, and any design professional and other
              consulting costs resulting therefrom.
            </p>
            <p>
              A &quot;Claimant&quot; is any person or entity who contracts
              direct with or indirectly through Principal to furnish labor,
              services, or materials for use or incorporation into the Project,
              and who is identified in O.C.G.A. §44-14-361 as having a right to
              a special lien on the real property where the Project is located
              for which they furnish labor, services, or materials.
            </p>
            <p>
              Any Claimant who has not been paid in full for labor, services, or
              materials furnished for use in the performance of the Agreement
              shall have the right to make a claim and sue Surety on this Bond,
              without the Contractor being made a party to such action, and to
              prosecute such action to final judgment and execution. Within 10
              days of request by any person or entity appearing to be a
              potential Claimant, Principal shall promptly furnish a copy of
              this Bond.
            </p>
            <p>
              No separate agreement, modification, or change in the Agreement,
              change in the work covered by the Agreement, or extension of time
              for the completion of the Agreement shall release Surety from its
              obligations hereunder. Accordingly, Surety hereby waives notice of
              any change to the Agreement, including modifications to the time
              for performance, the scope of the Agreement, or other obligations
              under the Agreement.
            </p>
            <p>
              Any proceeding, legal or equitable, under this Bond shall be
              instituted in accordance with the method of dispute resolution
              specified in the contract between Claimant and either Contractor
              or a subcontractor of any tier in relation to the Project within
              the applicable statute of limitations.
            </p>
          </div>
        </div>
      )}

      {pageNumber === 8 && (
        <div className={`flex flex-col gap-4 text-justify break-before-page`}>
          <p className="font-bold mb-4">
            IN WITNESS WHEREOF, WE HAVE CAUSED THE INSTRUMENT TO BE EXECUTED AND
            SEALED BY OUR DULY AUTHORIZED LEGAL REPRESENTATIVES.
          </p>

          <p className="mb-8">
            Signed and sealed this _______ day of _____________, 20_____.
          </p>

          <div className="flex flex-col gap-8">
            <div>
              <p className="font-bold">
                PRINCIPAL: [INSERT FULL LEGAL NAME OF PRINCIPAL]
              </p>
              <div className="mt-7">
                <p>By: _________________________________</p>
                <p className="">(Signature)</p>
                <p className="text-center italic mt-4">AFFIX CORPORATE SEAL</p>
                <p className="mt-4 mr-4">_________________________________</p>
                <p className="">(Title)</p>
                <div className="mt-4">
                  <p>Witnessed by: _______________________</p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-bold">
                SURETY: [INSERT FULL LEGAL NAME OF SURETY]
              </p>
              <div className="mt-7">
                <p>By: _________________________________</p>
                <p className="">(Signature)</p>
                <p className="text-center italic mt-4">AFFIX CORPORATE SEAL</p>
                <p className="mt-4 mr-4">_________________________________</p>
                <p className="">(Title)</p>
                <div className="mt-4">
                  <p>Witnessed by: _______________________</p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-8">
            A Power of Attorney has been affixed hereto and is made part of this
            Payment Bond.
          </p>
        </div>
      )}

      {pageNumber === 9 && (
        <div className="flex flex-col gap-4 text-justify">
          <h1 className=" font-bold text-center">
            ARTICLE 1 IMMIGRATION AND SECURITY AFFIDAVIT
          </h1>

          <p>
            The undersigned, being duly sworn, do hereby make oath and state
            that the facts stated herein are true and correct to the best of my
            knowledge, information and belief.
          </p>

          <p>
            The undersigned Subcontractor is in full compliance with the
            Immigration Reform and Control Act of 1986 (IRCA), Pub.L. 99-603 and
            the Georgia Security and Immigration Compliance Act O.C.G.A. § 13-
            10-90 et. seq., stating affirmatively that the individual, firm or
            corporation which is engaged in the physical performance of services
            under a contract with Paryani Construction has registered with and
            is participating in a federal work authorization program, including
            but not limited to E-Verify or any other verification of work
            authorization program required by federal, state or local law. The
            undersigned further affirmatively states that all employees working
            on the ____________ project (the &quot;Project&quot;) have been or
            will be verified using such programs, and that it has secured a
            similar affidavit from all sub-subcontractors working on the
            Project.
          </p>

          <div className="flex flex-col mt-8 mb-8">
            <div className="flex flex-col">
              <p>_________________________________</p>
              <p>E-Verify User Identification Number</p>
            </div>
            <div className="mt-7">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <p>_________________________________</p>
                  <p>Signature: </p>
                </div>
                <div className="flex flex-col">
                  <p>_________________________________</p>
                  <p>Title: </p>
                </div>
              </div>
              <div className="flex flex-col pt-8">
                <p>_________________________________</p>
                <p>Name of Subcontractor: </p>
              </div>
            </div>

            <div className="mt-8">
              <p>
                Subscribed before me this _______ day of _____________, 20_____.
              </p>
              <p className="mt-7">
                NOTARY PUBLIC: _________________________________
              </p>
              <p className="mt-4">
                My Commission Expires: _________________________________
              </p>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
