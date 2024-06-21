import { SVGProps } from "react";

const DinoSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 9 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      id="hair"
      d="M1.11442 1.14672C1.1133 1.04667 1.09434 0.922924 1.1781 0.845599C1.32689 0.810699 1.46528 0.941799 1.6157 0.893599C1.8147 0.830786 1.87881 0.616254 2.05232 0.522734C2.18157 0.494479 2.27411 0.646839 2.40687 0.612729C2.58567 0.564673 2.68624 0.383611 2.87486 0.357734C3.00015 0.356984 3.05965 0.516134 3.19231 0.488195C3.3838 0.448969 3.51616 0.283094 3.71219 0.255859C3.82256 0.268412 3.83569 0.402103 3.9002 0.469274C3.95862 0.590129 4.1062 0.483349 4.20112 0.527609C4.28778 0.607994 4.27874 0.737612 4.2678 0.841349"
      fill="#E05642"
    />
    <path
      id="front-back-leg"
      d="M5.96944 3.804C5.90717 3.83441 5.44078 3.67394 5.002 3.4807C4.52632 3.2712 4.07812 3.02623 4.07812 3.02623C4.07812 3.02623 4.56973 3.00205 5.01196 2.9324C5.2476 2.90059 5.5593 2.82077 5.79592 2.84625C5.79592 2.84625 6.09924 3.74065 5.96944 3.804Z"
      fill="#147165"
    />
    <g id="body">
      <path
        id="path2"
        d="M5.40914 2.87499C5.13641 2.96146 4.40616 3.0271 3.91969 3.02346C3.57615 3.0209 3.23246 3.04018 2.89029 2.99746C2.8039 2.94861 2.68704 3.00248 2.59098 2.96146C2.22372 2.85587 1.90004 2.64534 1.54317 2.51109C1.0504 2.28936 0.633774 1.95774 0.181863 1.67797C0.0222425 1.5616 0.247239 1.41266 0.358043 1.36073C1.34881 1.01336 2.42394 1.00593 3.45483 0.818856C4.17705 0.708627 4.9097 0.702377 5.63935 0.685236C6.12183 0.689373 6.6358 0.789092 7.11429 0.702796C7.57668 0.501831 8.04987 0.399144 8.51291 0.198486C8.66471 0.111825 8.9492 0.122554 8.73027 0.305991C8.35667 0.693445 7.84652 0.881215 7.44034 1.23216C7.29432 1.44981 7.35042 1.92507 7.35042 1.92507L6.92189 2.64674C6.65818 2.5859 6.41308 2.71918 6.16396 2.77399"
        fill="#149265"
      />
      <path
        id="path3"
        d="M2.62856 2.95879C2.0714 2.64607 1.42348 2.49089 0.899347 2.1258C0.6401 1.98612 0.39998 1.82347 0.171037 1.65357C0.101589 1.54912 0.268146 1.44664 0.360172 1.40281C0.632943 1.26808 0.933437 1.21524 1.23671 1.17607C1.79997 1.09913 2.35685 0.990357 2.92215 0.923691C3.49392 0.852424 4.06674 0.77364 4.64386 0.748193C5.1469 0.749631 5.65326 0.685983 6.15305 0.768945C6.64626 0.805206 7.15848 0.754474 7.60059 0.538196C7.9989 0.395642 8.40716 0.276925 8.80222 0.126953"
        stroke="#147165"
        strokeWidth={0.1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="path4"
        d="M8.81564 0.162842C8.7846 0.260036 8.65261 0.31661 8.58369 0.399717C8.48452 0.489413 8.38091 0.575996 8.27428 0.658335C8.08567 0.77178 7.90616 0.898036 7.71724 1.01134C7.61727 1.08324 7.4237 1.19319 7.39282 1.29118"
        stroke="#147165"
        strokeWidth={0.1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="path5"
        d="M1.6625 1.72947C1.66359 1.73081 1.66413 1.73068 1.66413 1.7291C1.66413 1.72751 1.66345 1.72418 1.66209 1.7191C1.66082 1.71393 1.65995 1.71139 1.6595 1.71147C1.65904 1.71156 1.65882 1.71147 1.65882 1.71147C1.65882 1.71147 1.65763 1.71026 1.65527 1.70835C1.65291 1.70635 1.652 1.70539 1.65254 1.70547C1.65318 1.70547 1.65341 1.70572 1.65323 1.70622C1.65304 1.70672 1.65282 1.70489 1.65254 1.70072C1.65773 1.69564 1.65954 1.69376 1.658 1.6951C1.66582 1.68993 1.66873 1.68797 1.66673 1.68922C1.67018 1.68372 1.68036 1.67939 1.69727 1.67622C1.71427 1.67314 1.72727 1.67076 1.73627 1.6691C1.74536 1.66743 1.75432 1.66914 1.76313 1.67422C1.77204 1.67931 1.77909 1.68822 1.78427 1.70097C1.78936 1.71372 1.79123 1.72493 1.78986 1.7346C1.78841 1.74435 1.78577 1.75001 1.78195 1.7516C1.77813 1.75326 1.77145 1.75722 1.76191 1.76347C1.75236 1.76964 1.74159 1.77418 1.72959 1.7771C1.7175 1.77993 1.70804 1.78181 1.70123 1.78272C1.69441 1.78364 1.68504 1.78464 1.67313 1.78572C1.66132 1.78681 1.65009 1.78068 1.63945 1.76735C1.62882 1.75401 1.62141 1.74064 1.61723 1.72722C1.61304 1.71381 1.61068 1.70368 1.61013 1.69685C1.60968 1.68993 1.61168 1.68443 1.61613 1.68035C1.62059 1.67635 1.62545 1.67343 1.63073 1.6716C1.636 1.66976 1.64 1.66847 1.64273 1.66772C1.64536 1.66697 1.65013 1.66626 1.65704 1.6656C1.66395 1.66485 1.67236 1.66431 1.68227 1.66397C1.69227 1.66364 1.70122 1.66418 1.70913 1.6656C1.71713 1.66701 1.72327 1.66847 1.72754 1.66997C1.73182 1.67139 1.73595 1.67326 1.73995 1.6756C1.74404 1.67801 1.74945 1.68164 1.75618 1.68647C1.763 1.69139 1.76882 1.70218 1.77363 1.71885C1.77854 1.73551 1.781 1.74856 1.781 1.75797C1.781 1.76739 1.78036 1.77543 1.77909 1.7821C1.77773 1.78868 1.7735 1.79585 1.76641 1.8036C1.75923 1.81135 1.74513 1.81651 1.72413 1.8191C1.70313 1.82168 1.68277 1.82018 1.66304 1.8146C1.64332 1.80901 1.62618 1.80118 1.61163 1.7911C1.59709 1.78093 1.58668 1.77114 1.58041 1.76172C1.57422 1.75231 1.57523 1.74226 1.58341 1.7316C1.59159 1.72093 1.59932 1.71256 1.60659 1.70647C1.61386 1.70047 1.62495 1.69497 1.63986 1.68997C1.65468 1.68489 1.67018 1.68151 1.68636 1.67985C1.70254 1.67818 1.71727 1.6801 1.73054 1.6856C1.74373 1.69101 1.75382 1.69701 1.76082 1.7036C1.76773 1.7101 1.77322 1.71618 1.77732 1.72185C1.78141 1.7276 1.78427 1.73506 1.78591 1.74422C1.78754 1.75339 1.78495 1.76185 1.77813 1.7696C1.77132 1.77735 1.76441 1.78381 1.75741 1.78897C1.7505 1.79414 1.74068 1.79868 1.72795 1.8026C1.71532 1.80651 1.70432 1.80868 1.69495 1.8091C1.68559 1.80951 1.67541 1.81001 1.66441 1.8106C1.65341 1.81126 1.64082 1.80756 1.62663 1.79947C1.61245 1.79147 1.60254 1.78056 1.59691 1.76672C1.59127 1.75289 1.58686 1.74131 1.58368 1.73197C1.5805 1.72264 1.58204 1.71381 1.58832 1.70547C1.59459 1.69706 1.60445 1.68901 1.61791 1.68135C1.63136 1.67376 1.64777 1.66797 1.66713 1.66397C1.68659 1.65989 1.70568 1.6616 1.72441 1.6691C1.74313 1.6766 1.75586 1.68326 1.76259 1.6891C1.76932 1.69485 1.77573 1.7001 1.78182 1.70485C1.788 1.7096 1.79132 1.71831 1.79177 1.73097C1.79232 1.74372 1.792 1.75314 1.79082 1.75922C1.78963 1.76531 1.78513 1.77343 1.77732 1.7836C1.76959 1.79385 1.75695 1.80135 1.73941 1.8061C1.72177 1.81093 1.70341 1.81276 1.68432 1.8116C1.66532 1.81035 1.64841 1.80356 1.63359 1.79122C1.61877 1.77889 1.60895 1.76826 1.60413 1.75935C1.59932 1.75043 1.59582 1.74385 1.59363 1.7396C1.59145 1.73535 1.58932 1.72851 1.58723 1.7191C1.58513 1.70968 1.58473 1.70118 1.586 1.6936C1.58727 1.68601 1.58941 1.68056 1.59241 1.67722C1.5955 1.67389 1.59718 1.67198 1.59745 1.67148C1.59782 1.67098 1.60273 1.66756 1.61218 1.66122C1.62163 1.65489 1.63486 1.65143 1.65186 1.65085C1.66886 1.65035 1.68363 1.65073 1.69618 1.65198C1.70872 1.65315 1.72109 1.65726 1.73327 1.66435C1.74536 1.67151 1.75486 1.67911 1.76177 1.68711C1.76868 1.69511 1.77395 1.7056 1.77759 1.7186C1.78113 1.7316 1.78095 1.74281 1.77704 1.75222C1.77304 1.76164 1.76904 1.76831 1.76504 1.77222C1.76113 1.77622 1.75623 1.77956 1.75032 1.78222C1.74441 1.78481 1.73645 1.78664 1.72645 1.78772C1.71636 1.78881 1.70795 1.79022 1.70123 1.79197C1.69441 1.79364 1.68382 1.79176 1.66945 1.78635C1.655 1.78093 1.64304 1.77289 1.63359 1.76222C1.62413 1.75156 1.61791 1.74168 1.61491 1.7326C1.61182 1.7236 1.60927 1.71576 1.60727 1.7091C1.60527 1.70243 1.60491 1.69497 1.60618 1.68672C1.60745 1.67856 1.618 1.67231 1.63782 1.66797C1.65772 1.66364 1.67477 1.66176 1.68895 1.66235C1.70313 1.66293 1.7135 1.66397 1.72004 1.66547C1.7265 1.66689 1.73295 1.66981 1.73941 1.67422C1.74586 1.67856 1.75141 1.68293 1.75604 1.68735C1.76068 1.69176 1.76459 1.69685 1.76777 1.7026C1.77095 1.70826 1.77318 1.71731 1.77445 1.72972C1.77563 1.74214 1.77582 1.75189 1.775 1.75897C1.77409 1.76614 1.77241 1.77106 1.76995 1.77372C1.7675 1.77639 1.76568 1.77764 1.7645 1.77747C1.76323 1.77731 1.76036 1.77881 1.75591 1.78197C1.75154 1.78514 1.74209 1.78681 1.72754 1.78697C1.713 1.78714 1.70095 1.78531 1.69141 1.78147C1.68177 1.77772 1.6705 1.7731 1.65759 1.7676C1.64468 1.7621 1.63054 1.75568 1.61518 1.74835"
        stroke="#147165"
        strokeWidth={0.1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <path
      id="back-back-leg"
      d="M7.29006 1.87622C7.24086 2.07443 6.89692 2.34782 6.89722 2.71044C7.15794 2.79106 7.40784 2.88634 7.55613 2.93553C7.59746 2.95353 7.68011 2.90192 7.68416 2.84797C7.65652 2.49312 7.48384 1.69313 7.43434 1.33926C7.41785 1.22134 7.34694 1.21442 7.31418 1.33077C7.28077 1.44944 7.33426 1.69812 7.29006 1.87622Z"
      fill="#147165"
    />
    <g id="front-leg">
      <path
        id="path8"
        d="M4.04437 2.63347L4.037 2.62509L4.02991 2.62022C3.99964 2.5993 3.98032 2.58597 3.97196 2.58022C3.96369 2.57447 3.954 2.56772 3.94291 2.55997C3.9091 2.53814 3.88787 2.52443 3.87923 2.51884C3.8706 2.51326 3.86323 2.50851 3.85714 2.50459C3.85105 2.50068 3.84428 2.4963 3.83682 2.49147C3.80564 2.47205 3.78596 2.4598 3.77778 2.45472C3.7695 2.44964 3.7625 2.4453 3.75678 2.44172C3.75096 2.43822 3.74564 2.43497 3.74082 2.43197C3.73591 2.42905 3.73323 2.42743 3.73278 2.42709C3.65923 2.38376 3.61437 2.35764 3.59819 2.34872C3.5821 2.3398 3.56946 2.33294 3.56028 2.3281C3.551 2.32327 3.54337 2.3193 3.53737 2.31622C3.53128 2.31314 3.526 2.31051 3.52155 2.30834C3.51719 2.30618 3.51328 2.30426 3.50982 2.30259C3.50646 2.30093 3.50337 2.29944 3.50055 2.2981C3.49773 2.29677 3.49514 2.29551 3.49278 2.29434C3.49041 2.29326 3.48819 2.29222 3.4861 2.29122C3.484 2.29022 3.48196 2.28927 3.47996 2.28835C3.47805 2.28752 3.47619 2.28668 3.47437 2.28584C3.47255 2.28501 3.47014 2.28389 3.46714 2.28248C3.4546 2.27773 3.44596 2.27443 3.44123 2.27259C3.43641 2.27084 3.432 2.26918 3.428 2.26759C3.40864 2.26077 3.39605 2.25639 3.39023 2.25448C3.38441 2.25256 3.37941 2.25094 3.37523 2.2496C3.37105 2.24835 3.36732 2.24722 3.36405 2.24622C3.36069 2.24522 3.3575 2.24431 3.3545 2.24348C3.3515 2.24264 3.34946 2.24201 3.34837 2.24159C3.31328 2.23284 3.2907 2.22768 3.2806 2.22609C3.27051 2.22451 3.26215 2.22327 3.25551 2.22235C3.24888 2.22152 3.2432 2.22085 3.23847 2.22035C3.23365 2.21994 3.22947 2.21955 3.22592 2.21922C3.22229 2.21897 3.21906 2.21876 3.21624 2.21859C3.21342 2.21843 3.21088 2.2183 3.2086 2.21822C3.20624 2.21805 3.2041 2.21797 3.20219 2.21797C3.20019 2.21789 3.19838 2.21781 3.19674 2.21773C3.1951 2.21773 3.19356 2.21773 3.1921 2.21773C3.19056 2.21773 3.18915 2.21773 3.18788 2.21773C3.1866 2.21764 3.18429 2.21656 3.18092 2.21448L2.97815 2.28047L2.97351 2.28348C2.97297 2.28398 2.9722 2.28447 2.9712 2.28497C2.94165 2.30564 2.9236 2.31851 2.91706 2.32359C2.91051 2.32868 2.90529 2.3328 2.90138 2.33597C2.89747 2.33914 2.89415 2.34189 2.89142 2.34422C2.8887 2.34655 2.88624 2.34864 2.88406 2.35048C2.88179 2.35239 2.87974 2.35414 2.87792 2.35573C2.87601 2.35739 2.87374 2.35939 2.8711 2.36172C2.86283 2.36964 2.85715 2.37509 2.85406 2.37809C2.85097 2.38118 2.84865 2.38339 2.8471 2.38473C2.8321 2.40064 2.82256 2.4108 2.81847 2.41522C2.81438 2.41964 2.81088 2.42347 2.80797 2.42672C2.80506 2.42989 2.80233 2.43284 2.79979 2.43559C2.79733 2.43834 2.79597 2.43984 2.7957 2.44009C2.76279 2.47618 2.74306 2.49789 2.73651 2.50522C2.72997 2.51247 2.72479 2.51822 2.72097 2.52247C2.71715 2.52672 2.71392 2.5303 2.71129 2.53322C2.70856 2.53622 2.7061 2.53893 2.70392 2.54134C2.70183 2.54376 2.69979 2.54605 2.69779 2.54822C2.69579 2.55039 2.69447 2.5518 2.69383 2.55247C2.67283 2.57455 2.65988 2.58809 2.65497 2.59309C2.64997 2.59818 2.64583 2.60239 2.64256 2.60572C2.63929 2.60905 2.63629 2.61205 2.63356 2.61472C2.63083 2.61747 2.62933 2.61897 2.62906 2.61922C2.5866 2.65964 2.5612 2.68351 2.55283 2.69084C2.54456 2.69809 2.5381 2.70368 2.53347 2.70759C2.52883 2.71159 2.52497 2.71489 2.52188 2.71747C2.5187 2.72005 2.51592 2.7223 2.51356 2.72422C2.5111 2.72614 2.50888 2.72793 2.50688 2.72959C2.50488 2.73118 2.50297 2.73268 2.50115 2.73409C2.49933 2.73551 2.49724 2.73714 2.49488 2.73897C2.48924 2.74305 2.48533 2.74589 2.48315 2.74747C2.48088 2.74914 2.47779 2.7513 2.47388 2.75397C2.51297 2.78622 2.54783 2.81479 2.57847 2.83971C2.6091 2.86471 2.64701 2.89409 2.6922 2.92784C2.73729 2.96167 2.77024 2.98596 2.79106 3.00071C2.81197 3.01554 2.83451 3.03109 2.8587 3.04734C2.88297 3.06367 2.91242 3.08267 2.94706 3.10434C2.98169 3.12609 3.0096 3.14296 3.03079 3.15496C3.05206 3.16696 3.07933 3.18188 3.1126 3.19971C3.14597 3.21754 3.18024 3.23621 3.21542 3.25571C3.25051 3.27513 3.27756 3.28959 3.29656 3.29909C3.31556 3.3085 3.3305 3.31625 3.34141 3.32234C3.35232 3.32842 3.37128 3.33829 3.39828 3.35196C3.42519 3.36563 3.45005 3.37892 3.47287 3.39184C3.49578 3.40467 3.50814 3.41171 3.50996 3.41296C3.51169 3.41421 3.51819 3.41796 3.52946 3.42421C3.54064 3.43038 3.5531 3.43696 3.56682 3.44396C3.58055 3.45088 3.59305 3.45721 3.60432 3.46296C3.6155 3.46879 3.62955 3.47517 3.64646 3.48209C3.66337 3.48909 3.68641 3.499 3.71559 3.51184C3.74487 3.52467 3.76946 3.53574 3.78937 3.54508C3.80928 3.55441 3.81978 3.55925 3.82087 3.55959C3.82196 3.56 3.82823 3.56284 3.83969 3.56809C3.85105 3.57334 3.85946 3.57729 3.86491 3.57996C3.87037 3.58263 3.88041 3.58737 3.89505 3.5942C3.9096 3.60095 3.9236 3.60796 3.93705 3.61521C3.9506 3.62254 3.96669 3.63116 3.98532 3.64108C4.00396 3.65108 4.0296 3.66549 4.06223 3.68433C4.09487 3.70308 4.11287 3.71325 4.11623 3.71484C4.1196 3.71642 4.12596 3.7197 4.13532 3.7247C4.14478 3.72979 4.15646 3.73584 4.17037 3.74284C4.18437 3.74992 4.20536 3.75946 4.23336 3.77146C4.26127 3.78346 4.28077 3.79112 4.29186 3.79445C4.30304 3.7977 4.31481 3.80041 4.32718 3.80258C4.33954 3.80466 4.35177 3.80525 4.36386 3.80434C4.37595 3.80334 4.38236 3.80254 4.38309 3.80196C4.38381 3.80146 4.38822 3.79949 4.39631 3.79608C4.40068 3.75174 4.3974 3.70812 4.3865 3.6652C4.37559 3.6222 4.36709 3.58716 4.361 3.56008C4.3549 3.53291 4.3469 3.50413 4.337 3.47371C4.32709 3.44329 4.3155 3.40879 4.30222 3.37021C4.28904 3.33163 4.27877 3.29884 4.2714 3.27184C4.26404 3.24484 4.25063 3.20084 4.23118 3.13984C4.21172 3.07875 4.19395 3.02988 4.17786 2.99321C4.16178 2.95655 4.15182 2.93268 4.148 2.92159C4.14409 2.91043 4.14096 2.90172 4.1386 2.89547L4.13137 2.87309L4.121 2.83934L4.12128 2.83346C4.15128 2.81321 4.17232 2.79868 4.18441 2.78984L4.18072 2.78434C4.17837 2.78109 4.17582 2.77763 4.1731 2.77396C4.17046 2.77021 4.16696 2.76539 4.1626 2.75947L4.1495 2.74847C4.13841 2.73805 4.12823 2.72814 4.11896 2.71872C4.1015 2.6988 4.09 2.68563 4.08446 2.67922C4.07891 2.6728 4.074 2.66714 4.06973 2.66222C4.06537 2.6573 4.05982 2.65101 4.0531 2.64334C4.05019 2.64001 4.04728 2.63672 4.04437 2.63347Z"
        fill="#149265"
      />
      <path
        id="path9"
        d="M4.16606 3.05762C4.16806 3.08229 4.17174 3.1024 4.1771 3.11799C4.18247 3.13349 4.18638 3.14724 4.18883 3.15924C4.19119 3.17124 4.19269 3.18045 4.19333 3.18687C4.19388 3.19329 4.19583 3.20078 4.19919 3.20936C4.20247 3.21803 4.20701 3.22953 4.21283 3.24386C4.21865 3.25819 4.22369 3.27011 4.22797 3.27961C4.23224 3.28911 4.23492 3.29578 4.23601 3.29961C4.2371 3.30336 4.23833 3.30694 4.23969 3.31036C4.24106 3.31378 4.24238 3.31765 4.24365 3.32199C4.24492 3.32632 4.24733 3.33515 4.25088 3.34849C4.25442 3.36182 4.25819 3.3744 4.26219 3.38624C4.26628 3.39807 4.26938 3.40703 4.27147 3.41311C4.27356 3.41928 4.27624 3.42503 4.27951 3.43036C4.28278 3.43569 4.28888 3.44657 4.29778 3.46299C4.3066 3.4794 4.31288 3.49228 4.3166 3.50161C4.32033 3.51086 4.32265 3.51828 4.32355 3.52386C4.32446 3.52936 4.32714 3.53815 4.33159 3.55024C4.33596 3.56224 4.34178 3.57924 4.34905 3.60124C4.35632 3.62315 4.36264 3.64111 4.368 3.65511C4.37337 3.6691 4.3795 3.68619 4.38641 3.70636C4.39332 3.72653 4.40255 3.75169 4.41409 3.78186H4.41491C4.41491 3.78236 4.41491 3.78332 4.41491 3.78474C4.41464 3.78474 4.41437 3.78474 4.41409 3.78474C4.41446 3.78607 4.4145 3.78707 4.41423 3.78774C4.41396 3.7884 4.40923 3.79115 4.40005 3.79599C4.39078 3.80074 4.37714 3.80149 4.35914 3.79824C4.34114 3.7949 4.32688 3.79123 4.31633 3.78723C4.30569 3.78314 4.29733 3.77999 4.29124 3.77774C4.28506 3.77557 4.27874 3.77289 4.27228 3.76973C4.26592 3.76664 4.26306 3.76519 4.26369 3.76536C4.26442 3.76561 4.26378 3.76552 4.26178 3.7651C4.25988 3.76477 4.24401 3.75565 4.21419 3.73774C4.18447 3.71974 4.15969 3.70494 4.13988 3.69336C4.12006 3.68178 4.10469 3.67332 4.09378 3.66799C4.08297 3.66274 4.07451 3.65844 4.06842 3.65511C4.06233 3.65178 4.04097 3.63985 4.00433 3.61935C3.96769 3.59894 3.93383 3.57894 3.90274 3.55936C3.87174 3.53978 3.84456 3.52465 3.82119 3.51399C3.79783 3.50332 3.78056 3.49532 3.76938 3.48999C3.75819 3.48465 3.74456 3.47769 3.72847 3.46911C3.71238 3.46044 3.70056 3.45399 3.69301 3.44974C3.68547 3.44557 3.67906 3.44224 3.67378 3.43974C3.6686 3.43724 3.65933 3.43232 3.64597 3.42499C3.6326 3.41765 3.61574 3.40903 3.59538 3.39911C3.5751 3.38928 3.54656 3.37603 3.50974 3.35936C3.47292 3.34278 3.44538 3.33049 3.42711 3.32249C3.40884 3.31457 3.39511 3.30824 3.38593 3.30349C3.37675 3.29865 3.36979 3.29536 3.36507 3.29361C3.36043 3.29178 3.35725 3.29053 3.35552 3.28986C3.35379 3.28919 3.34684 3.28615 3.33466 3.28074C3.32238 3.2754 3.31238 3.27107 3.30466 3.26774C3.29684 3.26432 3.28607 3.25919 3.27234 3.25236C3.25861 3.24544 3.24711 3.23987 3.23784 3.23562C3.22848 3.23137 3.21888 3.22745 3.20907 3.22387C3.19916 3.22037 3.17725 3.21119 3.14334 3.19636C3.10943 3.18153 3.08343 3.16936 3.06534 3.15987C3.04725 3.15029 3.02775 3.13978 3.00684 3.12836C2.98593 3.11694 2.96502 3.10658 2.94411 3.09724C2.9232 3.08783 2.90934 3.08187 2.90252 3.07937C2.8957 3.07679 2.8772 3.06928 2.84702 3.05686C2.81693 3.04453 2.79502 3.03479 2.78129 3.02762C2.76766 3.02045 2.74957 3.01133 2.72702 3.00024C2.70457 2.98908 2.68448 2.97866 2.66675 2.96899"
        stroke="#147165"
        strokeWidth={0.1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <g id="back-leg">
      <path
        id="path10"
        d="M6.92992 2.36896C6.94107 2.45989 6.9513 2.85066 6.95447 2.99616C6.96313 3.14929 7.02041 3.5731 7.02598 3.6623C6.95324 3.67722 6.87973 3.63683 6.81178 3.6144C6.6463 3.5434 6.27032 3.37144 6.06249 3.26595C5.88307 3.14744 5.5602 2.97196 5.44678 2.87435C5.52511 2.76623 5.96341 2.38975 6.2582 2.34741"
        fill="#149265"
      />
      <path
        id="path11"
        d="M6.99763 2.46484C6.93534 2.6116 6.94732 2.89027 6.96455 2.96725C6.97767 3.09603 7.01818 3.37819 7.02056 3.50815C7.03302 3.56352 7.03238 3.62035 7.01953 3.67544C6.96534 3.67431 6.42138 3.43709 6.26053 3.34991C6.09967 3.26274 5.65943 3.0144 5.45728 2.90676"
        stroke="#147165"
        strokeWidth={0.1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);
export default DinoSvg;
