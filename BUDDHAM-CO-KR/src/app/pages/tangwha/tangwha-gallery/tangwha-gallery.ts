import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, effect, ElementRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ITangwhaSchema, TangwhaCategory } from '@app/core/interfaces/tangwha/i-tangwha';
import { TangwhaService } from '@app/core/services/tangwha/tangwha-service';
import { MATERIAL_COMMON } from '@app/shared/imports/material-imports';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { TangwhaCard } from "../tangwha-card/tangwha-card";
import { TangwhaModal } from "../tangwha-modal/tangwha-modal";

@Component({
  selector: 'app-tangwha-gallery',
  imports: [
    CommonModule,
    ...MATERIAL_COMMON,
    TangwhaCard,
    TangwhaModal
  ],
  templateUrl: './tangwha-gallery.html',
  styleUrl: './tangwha-gallery.scss',
})
export class TangwhaGallery implements OnInit, AfterViewInit {

  readonly service = inject(TangwhaService);
  private readonly destroyRef = inject(DestroyRef);

  // ── 뷰 참조 ───────────────────────────────────────────────
  private sentinel = viewChild<ElementRef>('sentinel');

  // ── 상태 ──────────────────────────────────────────────────
  readonly activeCategory = signal<TangwhaCategory | 'all'>('all');
  readonly searchTerm = signal<string>('');
  searchInput = '';

  selectedItem = signal<ITangwhaSchema | null>(null);

  // ── 검색 디바운스 ─────────────────────────────────────────
  private readonly search$ = new Subject<string>();

  // ── 카테고리 목록 ─────────────────────────────────────────
  readonly CATEGORIES: { label: string; value: TangwhaCategory | 'all' }[] = [
    { label: '전체', value: 'all' },
    { label: '불보살', value: '불보살' },
    { label: '나한', value: '나한' },
    { label: '신중', value: '신중' },
    { label: '산신', value: '산신' },
    { label: '기타', value: '기타' },
  ];
  // ── IntersectionObserver ──────────────────────────────────
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    this.setupObserver(); // ← 여기서 먼저 생성!
    this.search$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(term => {
      this.searchTerm.set(term);
      this.resetAndLoad();
    });
    this.resetAndLoad();
  }

  ngAfterViewInit(): void { }

  // ── 이벤트 핸들러 ─────────────────────────────────────────
  onSearchChange(value: string): void {
    this.search$.next(value);
  }

  setCategory(category: TangwhaCategory | 'all'): void {
    this.activeCategory.set(category);
    this.resetAndLoad();
  }

  openModal(item: ITangwhaSchema): void { this.selectedItem.set(item); }
  closeModal(): void { this.selectedItem.set(null); }

  private resetAndLoad(): void {
    this.service.reset();
    this.loadNextPage();
  }

  private loadNextPage(): void {
    this.service.loadMore({
      category: this.activeCategory(),
      search: this.searchTerm(),
      size: 12
    });
  }
  private readonly sentinelEffect = effect(() => {
    const el = this.sentinel()?.nativeElement;
    if (el && this.observer) {       // ✅ observer 존재 확인
      this.observer.observe(el);
    }
  });


  private setupObserver(): void {
    this.observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.loadNextPage();
      }
    }, { threshold: 0.1 });
  }
}
